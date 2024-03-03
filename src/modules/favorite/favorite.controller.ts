import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { BaseController } from "src/base/base.controller";
import { FavoriteService } from "./favorite.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TrackService } from "../track/track.service";
import CheckExistEntityComponent from "src/components/check-exist.component";
import { EntityName } from "src/enums/entity.enum";
import { plainToClass } from "class-transformer";
import { Favorite } from "src/entities/Favorites";
import { throwNotFound } from "src/utils/throw-exception.util";
import { ErrorCodes } from "src/constants/error-code.const";

@Controller("favs")
@ApiTags("Favorite")
export class FavoriteController extends BaseController {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly checkExistEntityComponent: CheckExistEntityComponent,
  ) {
    super();
  }

  /**
   *
   * @param id
   * @returns
   */
  @Post("/track/:id")
  @ApiOperation({ summary: "add track to favorites" })
  async addTrackToFavorite(@Param("id", ParseUUIDPipe) id: string) {
    try {
      const checkTrackExist =
        await this.checkExistEntityComponent.checkEntityExist(
          EntityName.TRACK,
          id,
        );

      const newDataFavorite: Favorite = plainToClass(Favorite, {
        tracks: [checkTrackExist],
      });

      await this.favoriteService.save(newDataFavorite);

      return this.throwSuccessProcess("Add track to favorite success");
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  @HttpCode(204)
  @Delete("/track/:id")
  @ApiOperation({ summary: "remove track from favorites" })
  async removeTrackFromFavorite(@Param("id", ParseUUIDPipe) id: string) {
    try {
      const checkFasExist = await this.favoriteService.findOne({
        where: { tracks: { id: id } },
      });

      if (!checkFasExist) {
        throwNotFound(
          "TRACK_NOT_IN_FAVORITE",
          "TRack is not in the favorites list",
          ErrorCodes.TRACK_NOT_IN_FAVORITE,
        );
      }
      await this.favoriteService.delete(checkFasExist.id);
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  @Post("/artist/:id")
  @ApiOperation({ summary: "add artist to favorites" })
  async addArtistToFavorite(@Param("id", ParseUUIDPipe) id: string) {
    try {
      const checkArtsitExist =
        await this.checkExistEntityComponent.checkEntityExist(
          EntityName.ARTIST,
          id,
        );

      const newDataFavorite: Favorite = plainToClass(Favorite, {
        artists: [checkArtsitExist],
      });

      await this.favoriteService.save(newDataFavorite);

      return this.throwSuccessProcess("Add artist to favorite success");
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  @HttpCode(204)
  @Delete("/artist/:id")
  @ApiOperation({ summary: "remove artist from favorites" })
  async removeArtistFromFavorite(@Param("id", ParseUUIDPipe) id: string) {
    try {
      const checkFasExist = await this.favoriteService.findOne({
        where: { artists: { id: id } },
      });

      if (!checkFasExist) {
        throwNotFound(
          "TRACK_NOT_IN_FAVORITE",
          "TRack is not in the favorites list",
          ErrorCodes.TRACK_NOT_IN_FAVORITE,
        );
      }
      await this.favoriteService.delete(checkFasExist.id);
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  @Post("/album/:id")
  @ApiOperation({ summary: "add album to favorites" })
  async addAlbumToFavorite(@Param("id", ParseUUIDPipe) id: string) {
    try {
      const checkAlbumExist =
        await this.checkExistEntityComponent.checkEntityExist(
          EntityName.ALBUM,
          id,
        );

      const newDataFavorite: Favorite = plainToClass(Favorite, {
        albums: [checkAlbumExist],
      });

      await this.favoriteService.save(newDataFavorite);

      return this.throwSuccessProcess("Add album to favorite success");
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  @HttpCode(204)
  @Delete("/album/:id")
  @ApiOperation({ summary: "remove album from favorites" })
  async removeAlbumFromFavorite(@Param("id", ParseUUIDPipe) id: string) {
    try {
      const checkFasExist = await this.favoriteService.findOne({
        where: { albums: { id: id } },
      });

      if (!checkFasExist) {
        throwNotFound(
          "TRACK_NOT_IN_FAVORITE",
          "TRack is not in the favorites list",
          ErrorCodes.TRACK_NOT_IN_FAVORITE,
        );
      }
      await this.favoriteService.delete(checkFasExist.id);
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   * Get all data favorite
   * @returns 
   */
  @Get()
  @ApiOperation({ summary: "get all favorites" })
  async getAllFavorites() {
    try {
      const [artists, albums, tracks] = await Promise.all([
        this.favoriteService.getAllData("artists"),
        this.favoriteService.getAllData("albums"),
        this.favoriteService.getAllData("tracks"),
      ]);

      return { artists, albums, tracks };
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }
}
