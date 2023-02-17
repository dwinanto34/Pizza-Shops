import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipeDto } from './dto/get-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './recipe.entity';
import { RecipeRepository } from './recipe.repository';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeRepository)
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async getAllRecipes(): Promise<Array<Recipe>> {
    return this.recipeRepository.find({});
  }
  
  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipeRepository.createRecipe(createRecipeDto);
  }

  async getRecipe(conditions: FindConditions<Recipe>): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne(conditions);

    if (!recipe) {
      throw new NotFoundException();
    }

    return recipe;
  }

  async deleteRecipe(getRecipeDto: GetRecipeDto): Promise<void> {
    const { id } = getRecipeDto;
    const res = await this.recipeRepository.delete({ id });

    if (res.affected === 0) {
      throw new NotFoundException(`Recipe with ID: "${id}" not found`);
    }
  }

  async updateRecipe(
    getRecipeDto: GetRecipeDto,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    const { id } = getRecipeDto;
    const recipe = await this.getRecipe({ id });
    const { pizza_product_id, pizza_ingredient_id, quantity } = updateRecipeDto;

    recipe.pizza_product_id = pizza_product_id;
    recipe.pizza_ingredient_id = pizza_ingredient_id;
    recipe.quantity = quantity;

    await this.recipeRepository.save(recipe);

    return recipe;
  }
}
