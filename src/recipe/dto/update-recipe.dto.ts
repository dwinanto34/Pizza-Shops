import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class UpdateRecipeDto {
    @IsString()
    @IsNotEmpty()
    pizza_product_id: string;
    
    @IsString()
    @IsNotEmpty()
    pizza_ingredient_id: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    quantity: number;
}
