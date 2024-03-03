import {
  AfterUpdate,
  BeforeUpdate,
  Column,
  Entity,
  UpdateDateColumn,
} from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Exclude } from "class-transformer";

@Entity("users")
export class User extends BaseEntity {
  @Column({
    nullable: false,
    length: 255,
  })
  login: string;

  @Column({
    nullable: false,
    length: 255,
  })
  @Exclude({ toPlainOnly: true })
  @Column({ select: false })
  password: string;

  @Column("int", {
    nullable: false,
    default: 1,
  })
  version: number;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    select: false,
  })
  updatedAt: Date;

  @BeforeUpdate()
  updateVersion() {
    this.version++;
  }
}
