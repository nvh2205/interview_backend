import { IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty({
    default: "oldPassword",
    required: true,
  })
  oldPassword: string;

  @IsString()
  @ApiProperty({
    default: "newPassword exemple",
    required: true,
  })
  newPassword: string;
}
