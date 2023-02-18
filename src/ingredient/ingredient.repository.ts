import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { EntityRepository, Repository } from 'typeorm';
  import { CreateIngredientDto } from './dto/create-ingredient.dto';
  import { Ingredient } from './ingredient.entity'

  @EntityRepository(Ingredient)
  export class IngredientRepository extends Repository<Ingredient> {
    async createIngredient(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
      const { name, average_price_per_unit, quantity, unit } = createIngredientDto;
      const ingredient = this.create({
        name,
        average_price_per_unit,
        quantity,
        unit,
      });
  
      try {
        await this.save(ingredient);
      } catch (err) {
        if (err.code === '23505') {
          throw new ConflictException('Data already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
  
      return ingredient;
    }
  }
  