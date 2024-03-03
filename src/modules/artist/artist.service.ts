import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { Artist } from "src/entities/Artist";
import { Repository } from "typeorm";

@Injectable()
export class ArtistService extends BaseService<Artist> {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {
    super(artistRepository);
  }

}
