import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Artist } from "./Artist";
import { Album } from "./Album";
import { Track } from "./Track";

@Entity("favorites")
export class Favorite extends BaseEntity {
  @ManyToMany(() => Artist, { onDelete: "CASCADE", cascade: true })
  @JoinTable()
  artists?: Artist[] | null;

  @ManyToMany(() => Album, { onDelete: "CASCADE", cascade: true })
  @JoinTable()
  albums?: Album[] | null;

  @ManyToMany(() => Track, { onDelete: "CASCADE", cascade: true })
  @JoinTable()
  tracks?: Track[] | null;
}
