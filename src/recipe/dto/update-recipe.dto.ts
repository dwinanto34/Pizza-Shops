import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class UpdateRecipeDto {
    @IsString()
    @IsNotEmpty()
    product_name: string;
    
    @IsString()
    @IsNotEmpty()
    ingredient_name: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    quantity: number;
}
