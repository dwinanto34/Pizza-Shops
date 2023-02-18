import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    product_id: string;
    
    @IsString()
    @IsNotEmpty()
    ingredient_id: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;
}
