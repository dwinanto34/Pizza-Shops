import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { EntityRepository, Repository } from 'typeorm';
  import { CreateRecipeDto } from './dto/create-recipe.dto';
  import { Recipe } from './recipe.entity'
  
  @EntityRepository(Recipe)
  export class RecipeRepository extends Repository<Recipe> {
    async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
      const { pizza_product_id, pizza_ingredient_id, quantity } = createRecipeDto;
      const recipe = this.create({
        pizza_product_id,
        pizza_ingredient_id,
        quantity,
      });
  
      try {
        await this.save(recipe);
      } catch (err) {
        if (err.code === '23505') {
          throw new ConflictException('Short name already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
  
      return recipe;
    }
  }