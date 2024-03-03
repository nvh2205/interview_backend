import {
  IsString,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateNewUserDto {
  @IsString()
  @ApiProperty({
    default: "HelloWorld",
    required: true,
  })
  login: string;

  @IsString()
  @ApiProperty({
    default: "password exemple",
    required: true,
  })
  password: string;
}
