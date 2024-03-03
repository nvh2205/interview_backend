import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreatOrUpdateAlbumnDto {
  @IsString()
  @ApiProperty({
    default: "name artist",
    required: true,
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    default: 2024,
    required: true,
  })
  year: number;

  @IsOptional()
  @IsUUID(4)
  @ApiProperty({
    default: "436938f1-6697-43d2-8c53-ef127d590353",
    required: false,
  })
  artistId?: string;
}
