import { isString } from "class-validator";
import { ErrorCodes } from "src/constants/error-code.const";

import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from "@nestjs/common";

export class ValidationPipe422 extends ValidationPipe {
    async transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
        // console.log("Debug ValidationPipe422", value, metadata);
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return await super.transform(value, metadata)
        } catch (e) {


            if (e instanceof BadRequestException) {
                const response = e.getResponse()

                throw new BadRequestException({
                    message:"VALIDATION_INPUT_TYPE_ERROR",
                    cause: isString(response) ? response : response,
                    errorCode: ErrorCodes.VALIDATION_INPUT_TYPE_ERROR
                })
            }

            throw e
        }
    }
}