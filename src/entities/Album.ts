import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Artist } from "./Artist";
import { Track } from "./Track";
import { Favorite } from "./Favorites";

@Entity("albums")
export class Album extends BaseEntity {
  @Column({
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    nullable: false,
  })
  year: number;

  @JoinTable()
  @ManyToOne(() => Artist, (artist) => artist.id, { onDelete: "SET NULL" })
  artist: Artist | null;

  @OneToMany(() => Track, (tracks) => tracks.album)
  tracks: Track[] | null;

  @ManyToMany(() => Favorite, (fas) => fas.id, {
    onDelete: "CASCADE",
    cascade: true,
  })
  fas?: Favorite[] | null;
}
