import { Module } from "@nestjs/common";
import { TrackService } from "./track.service";
import { TrackController } from "./track.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Track } from "src/entities/Track";
import { Artist } from "src/entities/Artist";
import { Album } from "src/entities/Album";
import { AlbumService } from "../album/album.service";
import { ArtistService } from "../artist/artist.service";
import CheckExistEntityComponent from "src/components/check-exist.component";

@Module({
  imports: [TypeOrmModule.forFeature([Track, Artist, Album])],
  providers: [
    TrackService,
    AlbumService,
    ArtistService,
    CheckExistEntityComponent,
  ],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
