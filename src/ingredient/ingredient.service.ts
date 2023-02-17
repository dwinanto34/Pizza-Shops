import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { GetIngredientDto } from './dto/get-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './ingredient.entity';
import { IngredientRepository } from './ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(IngredientRepository)
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async getAllIngredients(): Promise<Array<Ingredient>> {
    return this.ingredientRepository.find({});
  }
  
  async createIngredient(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    return this.ingredientRepository.createIngredient(createIngredientDto);
  }

  async getIngredient(conditions: FindConditions<Ingredient>): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOne(conditions);

    if (!ingredient) {
      throw new NotFoundException();
    }

    return ingredient;
  }

  async deleteIngredient(getIngredientDto: GetIngredientDto): Promise<void> {
    const { id } = getIngredientDto;
    const res = await this.ingredientRepository.delete({ id });

    if (res.affected === 0) {
      throw new NotFoundException(`Ingredient with ID: "${id}" not found`);
    }
  }

  async updateIngredient(
    getIngredientDto: GetIngredientDto,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    const { id } = getIngredientDto;
    const ingredient = await this.getIngredient({ id });
    const { name, average_price_per_unit, quantity, unit } = updateIngredientDto;

    ingredient.name = name;
    ingredient.average_price_per_unit = average_price_per_unit;
    ingredient.quantity = quantity;
    ingredient.unit = unit;

    await this.ingredientRepository.save(ingredient);

    return ingredient;
  }
}
