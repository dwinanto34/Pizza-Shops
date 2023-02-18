import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { EntityRepository, Repository } from 'typeorm';
  import { CreateRecipeDto } from './dto/create-recipe.dto';
  import { Recipe } from './recipe.entity'
  
  @EntityRepository(Recipe)
  export class RecipeRepository extends Repository<Recipe> {
    async createRecipe(recipe: Recipe): Promise<Recipe> {
      try {
        await this.save(recipe);
      } catch (err) {
        if (err.code === '23505') {
          throw new ConflictException('Data already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
  
      return recipe;
    }
  }