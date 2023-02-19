import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';
import bigDecimal = require('js-big-decimal');

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  average_price_per_unit: bigDecimal;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  unit: string;
}