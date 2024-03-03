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
import { AlbumService } from "./album.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreatOrUpdateAlbumnDto } from "./dto/create-update-album.dto";
import { Artist } from "src/entities/Artist";
import { ArtistService } from "../artist/artist.service";
import { throwNotFound, throwUnprocessable } from "src/utils/throw-exception.util";
import { ErrorCodes } from "src/constants/error-code.const";
import { plainToClass } from "class-transformer";
import { Album } from "src/entities/Album";

@Controller("album")
@ApiTags("Album")
export class AlbumController extends BaseController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {
    super();
  }

  /**
   * craete album
   * @param createAlbum
   * @returns
   */
  @Post()
  @ApiOperation({ summary: "Create new album" })
  async craeteNewAlbum(@Body() createAlbum: CreatOrUpdateAlbumnDto) {
    try {
      let artist: Artist;

      // check if the request has artist
      if (createAlbum.artistId) {
        artist = await this.checkArtistExist(createAlbum.artistId);
      }

      const newDataAlbum: Album = plainToClass(Album, {
        ...createAlbum,
        artist,
      });
      const newAlbum: Album = await this.albumService.save(newDataAlbum);

      return newAlbum;
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   * update album
   * @param id
   * @param updateAlbum
   * @returns
   */
  @Put(":id")
  @ApiOperation({ summary: "Update album" })
  async updateAlbum(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateAlbum: CreatOrUpdateAlbumnDto,
  ) {
    try {
      let artist: Artist;

      // check if the request has artist
      if (updateAlbum.artistId) {
        artist = await this.checkArtistExist(updateAlbum.artistId);
      }

      //   check album exist
      const checkAlbumExist: Album = await this.albumService.findById(id);
      if (!checkAlbumExist) {
        throwNotFound(
          "ALBUM_NOT_FOUND",
          "Could not find album",
          ErrorCodes.ALBUM_NOT_FOUND,
        );
      }

      const { artistId, ...fomatDataUpdate } = updateAlbum;
      const newDataAlbum: Album = plainToClass(Album, {
        ...fomatDataUpdate,
        artist: artist || null,
        id,
      });

      await this.albumService.update(id, newDataAlbum);
      return this.throwSuccessProcess("Update album success");
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *
   * @returns
   */
  @Get()
  @ApiOperation({ summary: "Get all albums" })
  async getAllAlbums() {
    try {
      const listAllAlbums: Album[] = await this.albumService.findAll({
        relations: { artist: true },
      });
      return listAllAlbums;
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get(":id")
  @ApiOperation({ summary: "Get album" })
  async getAlbum(@Param("id", ParseUUIDPipe) id: string) {
    try {
      //   check album exist
      const checkAlbumExist: Album = await this.albumService.findOne({
        where: { id },
        relations: { artist: true },
      });
      if (!checkAlbumExist) {
        throwNotFound(
          "ALBUM_NOT_FOUND",
          "Could not find album",
          ErrorCodes.ALBUM_NOT_FOUND,
        );
      }

      return checkAlbumExist;
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *delete album by id
   * @param id
   */
  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({ summary: "delete album" })
  async deleteAlbum(@Param("id", ParseUUIDPipe) id: string) {
    try {
      //   check album exist
      const checkAlbumExist: Album = await this.albumService.findById(id);
      if (!checkAlbumExist) {
        throwNotFound(
          "ALBUM_NOT_FOUND",
          "Could not find album",
          ErrorCodes.ALBUM_NOT_FOUND,
        );
      }

      await this.albumService.delete(id);
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  //   check artist exist
  protected async checkArtistExist(artistId: string): Promise<Artist> {
    const checkArtistExist: Artist = await this.artistService.findById(
      artistId,
    );

    if (!checkArtistExist) {
      throwUnprocessable(
        "ARTIST_NOT_FOUND",
        "Could not find artist",
        ErrorCodes.ARTIST_NOT_FOUND,
      );
    }

    return checkArtistExist;
  }
}
