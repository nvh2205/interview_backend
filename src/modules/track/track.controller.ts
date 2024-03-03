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
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/base/base.controller";
import { TrackService } from "./track.service";
import { CreatOrUpdateTrackDto } from "./dto/create-update-track.dto";
import CheckExistEntityComponent from "src/components/check-exist.component";
import { EntityName } from "src/enums/entity.enum";
import { plainToClass } from "class-transformer";
import { Track } from "src/entities/Track";
import { throwNotFound } from "src/utils/throw-exception.util";
import { ErrorCodes } from "src/constants/error-code.const";

@Controller("track")
@ApiTags("Track")
export class TrackController extends BaseController {
  constructor(
    private readonly trackService: TrackService,
    private readonly checkExistEntityComponent: CheckExistEntityComponent,
  ) {
    super();
  }

  /**
   *
   * @param createTrack
   * @returns
   */
  @Post("")
  @ApiOperation({ summary: "Create track" })
  async createNewTrack(@Body() createTrack: CreatOrUpdateTrackDto) {
    try {
      let album;
      let artist;
      //   check album exist
      if (createTrack.albumId) {
        album = await this.checkExistEntityComponent.checkEntityExist(
          EntityName.ALBUM,
          createTrack.albumId,
        );
      }

      //   check artist exist
      if (createTrack.artistId) {
        artist = await this.checkExistEntityComponent.checkEntityExist(
          EntityName.ARTIST,
          createTrack.artistId,
        );
      }

      const newTrackData: Track = plainToClass(Track, {
        ...createTrack,
        album,
        artist,
      });

      const newTrack: Track = await this.trackService.save(newTrackData);

      return newTrack;
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *
   * @param id
   * @param updateTrack
   * @returns
   */
  @Put(":id")
  @ApiOperation({ summary: "Update track" })
  async updateTrack(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateTrack: CreatOrUpdateTrackDto,
  ) {
    try {
      const track = await this.checkExistEntityComponent.checkEntityExist(
        EntityName.TRACK,
        id,
      );

      let album;
      let artist;
      //   check album exist
      if (updateTrack.albumId) {
        album = await this.checkExistEntityComponent.checkEntityExist(
          EntityName.ALBUM,
          updateTrack.albumId,
        );
      }

      //   check artist exist
      if (updateTrack.artistId) {
        artist = await this.checkExistEntityComponent.checkEntityExist(
          EntityName.ARTIST,
          updateTrack.artistId,
        );
      }

      const { artistId, albumId, ...dataFormatUpdate } = updateTrack;
      const dataUpdateTrack = plainToClass(Track, {
        ...dataFormatUpdate,
        artist: artist || null,
        album: album || null,
        id,
      });

      await this.trackService.update(id, dataUpdateTrack);

      return this.throwSuccessProcess("Update track success");
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *
   * @returns
   */
  @Get("")
  @ApiOperation({ summary: "Get all tracks" })
  async getAllTracks() {
    try {
      const listAllTracks: Track[] = await this.trackService.findAll({
        relations: {
          album: true,
          artist: true,
        },
      });

      return listAllTracks;
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
  @ApiOperation({ summary: "Get track" })
  async getTrack(@Param("id", ParseUUIDPipe) id: string) {
    try {
      const checkTrackExist: Track = await this.trackService.findOne({
        where: { id },
        relations: {
          artist: true,
          album: true,
        },
      });

      if (!checkTrackExist) {
        throwNotFound(
          "TRACK_NOT_FOUND",
          "Could not find track",
          ErrorCodes.TRACK_NOT_FOUND,
        );
      }

      return checkTrackExist;
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *
   * @param id
   */
  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({ summary: "delete track" })
  async deleteAlbum(@Param("id", ParseUUIDPipe) id: string) {
    try {
      //   check album exist
      const checkAlbumExist: Track = await this.trackService.findById(id);
      if (!checkAlbumExist) {
        throwNotFound(
          "TRACK_NOT_FOUND",
          "Could not find track",
          ErrorCodes.TRACK_NOT_FOUND,
        );
      }

      await this.trackService.delete(id);
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }
}
