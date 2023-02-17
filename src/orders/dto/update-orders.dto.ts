import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class UpdateOrdersDto {
    @IsString()
    @IsNotEmpty()
    pizza_product_id: string;

    @IsNotEmpty()
    order_date: Date

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    sold_price: number

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    ingredient_cost: number

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    total_sold_price: number

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    total_ingredient_cost: number
}