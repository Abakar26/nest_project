import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Falvor } from './falvor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // @Column('json', { nullable: true }) //it makes that flavours can be empty.
  @JoinTable()
  @ManyToMany(
    type => Falvor,
    (flavor) => {
      flavor.coffees;
    },
    {
      cascade: true,
    },
  )
  flavors: Falvor[];
}
