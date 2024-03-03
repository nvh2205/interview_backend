import { Module } from "@nestjs/common";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "src/entities/Album";
import { Artist } from "src/entities/Artist";
import { ArtistService } from "../artist/artist.service";

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist])],
  controllers: [AlbumController],
  providers: [AlbumService, ArtistService],
  exports: [AlbumService],
})
export class AlbumModule {}
