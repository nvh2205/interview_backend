import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from "@nestjs/common";
import { BaseController } from "src/base/base.controller";
import { ArtistService } from "./artist.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Artist } from "src/entities/Artist";
import { throwNotFound } from "src/utils/throw-exception.util";
import { ErrorCodes } from "src/constants/error-code.const";
import { CreatOrUpdateArtistDto } from "./dto/create-update-artist.dto";
import { plainToClass } from "class-transformer";

@Controller("artist")
@ApiTags("Artist")
export class ArtistController extends BaseController {
  constructor(private readonly artistService: ArtistService) {
    super();
  }

  /**
   *Get all artist
   * @returns
   */
  @Get()
  @ApiOperation({ summary: "get all artists" })
  async getAllArtists() {
    try {
      const listArtists: Artist[] = await this.artistService.findAll();
      return listArtists;
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *Get artist by id
   * @param id
   * @returns
   */
  @Get(":id")
  @ApiOperation({ summary: "get  artist" })
  async getArtis(@Param("id", ParseUUIDPipe) id: string) {
    try {
      // check artist exist
      const checkArtistExist: Artist = await this.artistService.findById(id);
      if (!checkArtistExist) {
        throwNotFound(
          "ARTIST_NOT_FOUND",
          "Could not find artist",
          ErrorCodes.ARTIST_NOT_FOUND,
        );
      }

      return checkArtistExist;
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *Create new artist
   * @param createArtis
   * @returns
   */
  @Post()
  @ApiOperation({ summary: "Create new artist" })
  async createArtist(@Body() createArtis: CreatOrUpdateArtistDto) {
    try {
      const newArtist: Artist = plainToClass(Artist, createArtis);

      const newDataArtist: Artist = await this.artistService.save(newArtist);
      return newDataArtist;
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   * update artist by id
   * @param id
   * @param updateArtist
   * @returns
   */
  @Put(":id")
  @ApiOperation({ summary: "update artist" })
  async updateArtist(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateArtist: CreatOrUpdateArtistDto,
  ) {
    try {
      // check artist exist
      const checkArtistExist: Artist = await this.artistService.findById(id);
      if (!checkArtistExist) {
        throwNotFound(
          "ARTIST_NOT_FOUND",
          "Could not find artist",
          ErrorCodes.ARTIST_NOT_FOUND,
        );
      }
      const newDataUpdateArtist: Artist = plainToClass(Artist, {
        id,
        ...updateArtist,
      });
      await this.artistService.update(id, newDataUpdateArtist);

      return this.throwSuccessProcess("Update artist success");
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *detele artist by id
   * @param id
   */
  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({ summary: "Delete artist" })
  async deteleArtist(@Param("id", ParseUUIDPipe) id: string) {
    try {
      // check artist exist
      const checkArtistExist: Artist = await this.artistService.findById(id);
      if (!checkArtistExist) {
        throwNotFound(
          "ARTIST_NOT_FOUND",
          "Could not find artist",
          ErrorCodes.ARTIST_NOT_FOUND,
        );
      }
      await this.artistService.delete(id);
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }
}
