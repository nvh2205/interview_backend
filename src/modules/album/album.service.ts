import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { Album } from "src/entities/Album";
import { Repository } from "typeorm";

@Injectable()
export class AlbumService extends BaseService<Album> {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {
    super(albumRepository);
  }
}
