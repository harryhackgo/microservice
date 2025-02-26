import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column({ default: 0 })
  order: number;
}
