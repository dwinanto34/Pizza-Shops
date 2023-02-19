import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    product_name: string;
    
    @IsString()
    @IsNotEmpty()
    ingredient_name: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;
}
