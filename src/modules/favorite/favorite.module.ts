import { Module } from "@nestjs/common";
import { FavoriteController } from "./favorite.controller";
import { FavoriteService } from "./favorite.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "src/entities/Favorites";
import { Artist } from "src/entities/Artist";
import { Track } from "src/entities/Track";
import { Album } from "src/entities/Album";
import { ArtistService } from "../artist/artist.service";
import { AlbumService } from "../album/album.service";
import { TrackService } from "../track/track.service";
import CheckExistEntityComponent from "src/components/check-exist.component";

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Artist, Track, Album])],
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    ArtistService,
    AlbumService,
    TrackService,
    CheckExistEntityComponent,
  ],
})
export class FavoriteModule {}
