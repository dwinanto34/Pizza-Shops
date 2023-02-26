import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateRecipeDto } from './dto/create-recipe.dto';
  import { GetRecipeDto } from './dto/get-recipe.dto';
  import { UpdateRecipeDto } from './dto/update-recipe.dto';
  import { Recipe } from './recipe.entity';
  import { RecipeService } from './recipe.service';
  
  @Controller('recipe')
  export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}
  
    @Get()
    getAllRecipes(): Promise<Recipe[]> {
      return this.recipeService.getAllRecipes();
    }
  
    @Post()
    createRecipe(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
      return this.recipeService.createRecipe(createRecipeDto);
    }
  
    @Delete('/:id')
    deleteRecipe(@Param() getRecipeDto: GetRecipeDto): Promise<boolean> {
      return this.recipeService.deleteRecipe(getRecipeDto);
    }
  
    @Put('/:id')
    updateRecipe(
      @Param() getRecipeDto: GetRecipeDto,
      @Body() updateRecipeDto: UpdateRecipeDto,
    ): Promise<Recipe> {
      return this.recipeService.updateRecipe(getRecipeDto, updateRecipeDto);
    }

    @Get(':product_name')
    getRecipes(@Param('product_name') product_name: string): Promise<Recipe[]> {
      return this.recipeService.getRecipesByProductName(product_name);
    }
}
  