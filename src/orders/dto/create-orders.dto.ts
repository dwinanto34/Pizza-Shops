import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';
import bigDecimal = require('js-big-decimal');

export class CreateOrdersDto {
    @IsString()
    @IsNotEmpty()
    product_name: string;

    @IsNotEmpty()
    order_date: Date;

    @IsNotEmpty()
    sold_price: bigDecimal;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;
}