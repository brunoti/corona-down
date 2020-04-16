import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Client } from './Client';
import { Point } from '@types';

@Entity('locations')
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'point',
    nullable: false,
    transformer: {
      from: v => v,
      to: v => `${v.x}, ${v.y}`,
    },
  })
  coords!: Point;

  @ManyToOne(() => Client, client => client.locations)
  client!: Client;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
