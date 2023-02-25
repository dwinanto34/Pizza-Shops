import bigDecimal = require('js-big-decimal');

export class PizzaOrder {
    orderId: string;
    productName: string;
    orderDate: Date;
    quantity: number;
    soldPrice: bigDecimal;
    totalSoldPrice: bigDecimal;
    ingredientCost: bigDecimal;
    totalIngredientCost: bigDecimal;
    totalProfit: bigDecimal;
    ingredients: Ingredient[];
}

interface Ingredient {
    name: string;
    price: bigDecimal;
    quantity: number;
}
