import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Artist } from "./Artist";
import { Album } from "./Album";
import { Favorite } from "./Favorites";

@Entity("tracks")
export class Track extends BaseEntity {
  @Column({
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    nullable: false,
  })
  duration: number;

  @JoinTable()
  @ManyToOne(() => Artist, (artist) => artist.id, { onDelete: "SET NULL" })
  artist: Artist | null;

  @JoinTable()
  @ManyToOne(() => Album, (album) => album.id, { onDelete: "SET NULL" })
  album: Album | null;

  @ManyToMany(() => Favorite, (fas) => fas.id, {
    onDelete: "CASCADE",
    cascade: true,
  })
  fas?: Favorite[] | null;
}
