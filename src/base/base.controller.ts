import { ErrorCodes } from "src/constants/error-code.const";
import { BaseError } from "src/exceptions/errors/base.error";
import { DatabaseError } from "src/exceptions/errors/database.error";
import {
  throwDatabase,
  throwForbidden,
  throwValidate,
} from "src/utils/throw-exception.util";
import { QueryFailedError } from "typeorm";

import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { NotFoundError } from "src/exceptions/errors/not-found.error";
import { UnprocessableError } from "src/exceptions/errors/unprocessable.error";

export class BaseController {
  protected throwErrorProcess(error: any) {
    console.log("Debug", error);

    if (error instanceof NotFoundError) {
      throw new NotFoundException({
        message: error.getMessage(),
        cause: error.getCause(),
        errorCode: error.getErrorCode(),
      });
    } else if (error instanceof UnprocessableError) {
      throw new UnprocessableEntityException({
        message: error.getMessage(),
        cause: error.getCause(),
        errorCode: error.getErrorCode(),
      });
    } else if (error instanceof BaseError) {
      throw new BadRequestException({
        message: error.getMessage(),
        cause: error.getCause(),
        errorCode: error.getErrorCode(),
      });
    } else if (error instanceof TypeError) {
      throw throwValidate(
        "VALIDATE_ERROR",
        error.message,
        ErrorCodes.SYNTAXERROR,
      );
    } else if (error instanceof QueryFailedError) {
      throwDatabase(
        "QUERY_ERROR",
        JSON.stringify(error.message),
        ErrorCodes.UNKNOWN,
      );
    } else if (error instanceof ForbiddenException) {
      throwForbidden(error.message, error.name, ErrorCodes.INVALID_VALUE);
    }

    throw new DatabaseError(
      "UNKNOWN_ERROR",
      { errorContent: error },
      ErrorCodes.UNKNOWN,
    );
  }

  protected throwSuccessProcess(message: string) {
    return { message };
  }
}
