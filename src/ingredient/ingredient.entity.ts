import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity'
import { BigDecimalTransformer } from '../helper/big-decimal.transformer';
import bigDecimal = require('js-big-decimal');

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new BigDecimalTransformer() })
  average_price_per_unit: bigDecimal;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @OneToMany(() => Recipe, (recipe) => recipe.ingredient)
  recipe: Recipe[]
}
