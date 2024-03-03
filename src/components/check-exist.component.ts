import { Injectable } from "@nestjs/common";
import { ErrorCodes } from "src/constants/error-code.const";
import { EntityName } from "src/enums/entity.enum";
import { AlbumService } from "src/modules/album/album.service";
import { ArtistService } from "src/modules/artist/artist.service";
import { TrackService } from "src/modules/track/track.service";
import {
  throwUnprocessable,
} from "src/utils/throw-exception.util";

@Injectable()
export default class CheckExistEntityComponent {
  constructor(
    private readonly artisService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async checkEntityExist(entity: EntityName, id: string) {
    let record;
    if (entity == EntityName.ARTIST) {
      record = await this.artisService.findById(id);
    } else if (entity == EntityName.ALBUM) {
      record = await this.albumService.findById(id);
    } else if ((entity = EntityName.TRACK)) {
      record = await this.trackService.findById(id);
    } else {
      record = null;
    }
    if (!record) {
      throwUnprocessable(
        "RECORD_NOT_FOUND",
        `${entity} not found`,
        ErrorCodes.RECORD_NOT_FOUND,
      );
    }

    return record;
  }
}
