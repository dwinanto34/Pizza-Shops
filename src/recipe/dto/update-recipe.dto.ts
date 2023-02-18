import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class UpdateRecipeDto {
    @IsString()
    @IsNotEmpty()
    product_id: string;
    
    @IsString()
    @IsNotEmpty()
    ingredient_id: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    quantity: number;
}
