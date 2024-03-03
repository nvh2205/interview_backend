import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreatOrUpdateTrackDto {
  @IsString()
  @ApiProperty({
    default: "new track",
    required: true,
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    default: 68,
    required: true,
  })
  duration: number;

  @IsOptional()
  @IsUUID(4)
  @ApiProperty({
    default: "436938f1-6697-43d2-8c53-ef127d590353",
    required: false,
  })
  artistId?: string;

  @IsOptional()
  @IsUUID(4)
  @ApiProperty({
    default: "436938f1-6697-43d2-8c53-ef127d590353",
    required: false,
  })
  albumId?: string;
}
