import { isString } from "class-validator";
import { FastifyReply as Response } from "fastify";
import { ErrorCodes } from "src/constants/error-code.const";
import { BaseError } from "src/exceptions/errors/base.error";
import { DatabaseError } from "src/exceptions/errors/database.error";
import { QueryFailedError } from "typeorm";

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

import { LoggerService } from "src/logger/custom.logger";
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  private static handleResponse(
    response: Response,
    exception:
      | HttpException
      | DatabaseError
      | QueryFailedError
      | Error
      | BaseError
      | ForbiddenException,
  ): void {
    let responseBody: unknown = { message: "Internal server error" };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof ForbiddenException) {
      statusCode = exception.getStatus();

      responseBody = {
        message: exception.message || "Invalid Header",
        errorCode: ErrorCodes.INVALID_VALUE,
        cause: exception.name,
      };
    } else if (exception instanceof HttpException) {
      const response = exception.getResponse();
      // const i18n = new MessageComponent()

      let message: unknown;
      let errorCode: unknown;
      let cause: unknown;

      if (isString(response)) {
        message = response;
        errorCode = ErrorCodes.UNKNOWN;
        cause = "";
      } else {
        const res = response as Record<string, unknown>;

        message = res.message || "Unknown error";
        errorCode = res.errorCode || ErrorCodes.UNKNOWN;
        cause = res.cause || "";
      }

      responseBody = {
        message: message.toString(),
        errorCode: errorCode,
        cause,
      };

      statusCode = exception.getStatus();
    } else if (exception instanceof DatabaseError) {
      statusCode = HttpStatus.BAD_REQUEST;

      responseBody = {
        errorCode: exception.getErrorCode(),
        message: exception.message,
        cause: exception.getCause(),
      };
    } else if (exception instanceof BaseError) {
      statusCode = HttpStatus.BAD_REQUEST;

      responseBody = {
        errorCode: exception.getErrorCode(),
        message: exception.message,
        cause: exception.getCause(),
      };
    } else if (exception instanceof QueryFailedError) {
      statusCode = HttpStatus.BAD_REQUEST;

      responseBody = {
        errorCode: ErrorCodes.UNKNOWN,
        message: "Query database error.",
        cause: exception,
      };
    } else if (exception instanceof Error) {
      responseBody = {
        errorCode: ErrorCodes.UNKNOWN,
        message: "An error occurred, please try again.",
        cause: exception.message,
      };
    }

    void response.status(statusCode).send(responseBody);
  }

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();

    // Handling error message and logging
    this.handleMessage(exception);

    // Response to client
    AllExceptionFilter.handleResponse(response, exception);
  }

  /**
   * @param exception
   */
  private handleMessage(
    exception: HttpException | DatabaseError | QueryFailedError | Error,
  ): void {
    let message = "Internal Server Error";

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof DatabaseError) {
      message = exception.message;
    } else if (exception instanceof QueryFailedError) {
      message = exception.stack.toString();
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }

    this.logger.error(message);
  }
}
