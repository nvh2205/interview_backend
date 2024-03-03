import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { Track } from "src/entities/Track";
import { Repository } from "typeorm";

@Injectable()
export class TrackService extends BaseService<Track> {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {
    super(trackRepository);
  }
}
