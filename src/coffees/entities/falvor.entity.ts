import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './cofffee.entity';

@Entity()
export class Falvor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    type => Coffee,
    (coffee) => {
      coffee.flavors;
    },
  )
  coffees: Coffee[];
}
