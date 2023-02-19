import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipeDto } from './dto/get-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './recipe.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
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
    return this.recipeRepository.find({
      relations: ['product', 'ingredient'],
    });
  }
  
  // CreateRecipeDto should have product_id and ingredient_id, instead of the name
  // I do it for purpose to make it easier for me to put the data on PostMan
  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const { product_name, ingredient_name, quantity } = createRecipeDto;
    const recipeEntity = new Recipe();
    recipeEntity.ingredient = await this.ingredientService.getIngredient({ name: ingredient_name });
    recipeEntity.product = await this.productService.getProduct({ name: product_name });
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
  
  async getIngredientsByProductName(product_name: string): Promise<Ingredient[]> {
    const product = await this.productService.getProduct({ name: product_name })
    const recipes = await this.recipeRepository.find({
      where: {product: product},
      relations: ['product', 'ingredient'],
    });

    if (!recipes || recipes.length == 0) {
      throw new NotFoundException();
    }

    const ingredients = [];
    recipes.forEach(recipe => {
      ingredients.push(recipe.ingredient)
    })

    return ingredients
  }

  async deleteRecipe(getRecipeDto: GetRecipeDto): Promise<boolean> {
    const { id } = getRecipeDto;
    const res = await this.recipeRepository.delete({ id });

    if (res.affected === 0) {
      throw new NotFoundException(`Recipe with ID: "${id}" not found`);
    }

    return true
  }

  // UpdateRecipeDto should have product_id and ingredient_id, instead of the name
  // I do it for purpose to make it easier for me to put the data on PostMan
  async updateRecipe(
    getRecipeDto: GetRecipeDto,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    const { id } = getRecipeDto;
    const { product_name, ingredient_name, quantity } = updateRecipeDto;
    
    const recipe = await this.getRecipe({ id });
    recipe.product = await this.productService.getProduct({ name: product_name });
    recipe.ingredient = await this.ingredientService.getIngredient({ name: ingredient_name });
    recipe.quantity = quantity;

    await this.recipeRepository.save(recipe);

    return recipe;
  }
}
