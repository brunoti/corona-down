import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  FindOneOptions,
} from 'typeorm';
import { Location } from './Location';

@Entity('clients')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  token!: string;

  @OneToMany(() => Location, location => location.client)
  locations!: Location[]

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  static findByToken(token: string, options: FindOneOptions = {}) {
    return this.findOneOrFail({ ...options, where: { token } } as FindOneOptions);
  }
}
