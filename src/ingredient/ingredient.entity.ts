import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  average_price_per_unit: number;

  @Column()
  quantity: number;

  @Column()
  unit: string;
}
