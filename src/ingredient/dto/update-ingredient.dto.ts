import { IsNotEmpty, IsString, IsPositive, IsNumber } from 'class-validator';

export class UpdateIngredientDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    average_price_per_unit: number;
  
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;
  
    @IsString()
    @IsNotEmpty()
    unit: string;
}
