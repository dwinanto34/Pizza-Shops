import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Orders } from '../orders/orders.entity'
import { Recipe } from '../recipe/recipe.entity'
import { BigDecimalTransformer } from '../helper/big-decimal.transformer';
import bigDecimal = require('js-big-decimal');

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new BigDecimalTransformer() })
  price: bigDecimal;

  @OneToMany(() => Orders, (orders) => orders.product)
  order: Orders[]
  
  @OneToMany(() => Recipe, (recipe) => recipe.product)
  recipe: Recipe[]
}
