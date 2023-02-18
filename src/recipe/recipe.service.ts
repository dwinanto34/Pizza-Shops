import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipeDto } from './dto/get-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './recipe.entity';
import { RecipeRepository } from './recipe.repository';
import { ProductService } from '../product/product.service';
import { IngredientService } from '../ingredient/ingredient.service';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeRepository)
    private readonly recipeRepository: RecipeRepository,
    
    private readonly productService: ProductService,
    private readonly ingredientService: IngredientService,
  ) {}

  async getAllRecipes(): Promise<Array<Recipe>> {
    return this.recipeRepository.find({});
  }
  
  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const { product_id, ingredient_id, quantity } = createRecipeDto;
    const recipeEntity = new Recipe();
    recipeEntity.ingredient = await this.ingredientService.getIngredient({ id: ingredient_id });
    recipeEntity.product = await this.productService.getProduct({ id: product_id });
    recipeEntity.quantity = quantity;
    
    return this.recipeRepository.createRecipe(recipeEntity);
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
    const { product_id, ingredient_id, quantity } = updateRecipeDto;
    
    const recipe = await this.getRecipe({ id });
    recipe.product = await this.productService.getProduct({ id: product_id });
    recipe.ingredient = await this.ingredientService.getIngredient({ id: ingredient_id });
    recipe.quantity = quantity;

    await this.recipeRepository.save(recipe);

    return recipe;
  }
}
