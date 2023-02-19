import { IsNotEmpty, IsString, IsPositive, IsNumber } from 'class-validator';
import bigDecimal = require('js-big-decimal');

export class UpdateIngredientDto {
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
