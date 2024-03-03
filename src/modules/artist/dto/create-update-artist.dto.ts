import { IsBoolean, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreatOrUpdateArtistDto {
  @IsString()
  @ApiProperty({
    default: "name artist",
    required: true,
  })
  name: string;

  @IsBoolean()
  @ApiProperty({
    default: true,
    required: true,
  })
  grammy: boolean;
}
