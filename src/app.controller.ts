import Request from "fastify";

import {
  Controller,
  Get,
  Req,
} from "@nestjs/common";

import { AppService } from "./app.service";
import { BaseError } from "./exceptions/errors/base.error";
import { DatabaseError } from "./exceptions/errors/database.error";
import { ValidateError } from "./exceptions/errors/validate.error";
import { ConfigService } from "@nestjs/config";
import { BaseController } from "./base/base.controller";

@Controller()
export class AppController extends BaseController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {
    super();
  }


  @Get("exceptions")
  async TestException(@Req() request: Request): Promise<string> {
    try {
      throw new ValidateError("validate", "fdf", 400);
      // throwError<ValidateError>("database", "fdf", 400)
    } catch (e) {
      if (e instanceof ValidateError) {
        console.log("ValidateError", e);
      } else if (e instanceof DatabaseError) {
        console.log("DatabaseError", e);
      } else if (e instanceof BaseError) {
        console.log("BaseError", e);
      }
    }

    return "test";
  }

  @Get("healthz")
  selfCheck(): unknown {
    return { message: "Request Succeed!" };
  }
}
