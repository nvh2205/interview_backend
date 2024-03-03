import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Track } from "./Track";
import { Album } from "./Album";
import { Favorite } from "./Favorites";

@Entity("artists")
export class Artist extends BaseEntity {
  @Column({
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    nullable: false,
  })
  grammy: boolean;

  @OneToMany(() => Album, (albums) => albums.artist)
  albums: Album[];

  @OneToMany(() => Track, (tracks) => tracks.artist)
  tracks: Track[];

  @ManyToMany(() => Favorite, (fas) => fas.id, {
    onDelete: "CASCADE",
    cascade: true,
  })
  fas?: Favorite[] | null;
}
