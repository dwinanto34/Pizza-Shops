import bigDecimal = require('js-big-decimal');

export class PizzaOrder {
    orderId: string;
    productName: string;
    orderDate: Date;
    quantity: number;
    soldPrice: number;
    totalSoldPrice: number;
    ingredientCost: number;
    totalIngredientCost: number;
    totalProfit: number;
    ingredients: Ingredient[];
}

interface Ingredient {
    name: string;
    price: number;
    quantity: number;
}
