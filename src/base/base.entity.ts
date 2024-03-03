// base.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();


}
