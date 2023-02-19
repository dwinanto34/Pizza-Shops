import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateIngredientDto } from './dto/create-ingredient.dto';
  import { GetIngredientDto } from './dto/get-ingredient.dto';
  import { UpdateIngredientDto } from './dto/update-ingredient.dto';
  import { Ingredient } from './ingredient.entity';
  import { IngredientService } from './ingredient.service';
  
  @Controller('ingredient')
  export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) {}
  
    @Get()
    getAllIngredients(): Promise<Ingredient[]> {
      return this.ingredientService.getAllIngredients();
    }
  
    @Post()
    createIngredient(@Body() createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
      return this.ingredientService.createIngredient(createIngredientDto);
    }
    
    @Get(':name')
    getIngredient(@Param('name') name: string): Promise<Ingredient> {
      return this.ingredientService.getIngredient({ name });
    }

    @Delete('/:id')
    deleteIngredient(@Param() getIngredientDto: GetIngredientDto): Promise<boolean> {
      return this.ingredientService.deleteIngredient(getIngredientDto);
    }
  
    @Put('/:id')
    updateIngredient(
      @Param() getIngredientDto: GetIngredientDto,
      @Body() updateIngredientDto: UpdateIngredientDto,
    ): Promise<Ingredient> {
      return this.ingredientService.updateIngredient(getIngredientDto, updateIngredientDto);
    }
  }
  