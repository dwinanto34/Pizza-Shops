// import { Args, Int, Mutation, Parent, Query, ResolveField, ResolveProperty, Resolver } from '@nestjs/graphql';
// import { forwardRef, Inject } from '@nestjs/common';
// import { Product } from './product.entity';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { ProductService } from './product.service';
// import { string } from 'joi';

// @Resolver(of => Product)
// export class ProductResolver {
//   constructor(
//     @Inject(forwardRef(() => ProductService))
//     private readonly productService: ProductService,
//   ) {}

//   @Query(returns => [Product], {name: 'products', nullable: true})
//   async getProducts() {
//     return this.productService.getAllProducts();
//   }

//   @Query(returns => Product, { name: 'product', nullable: true })
//   async getProductByName(@Args('data') name: string): Promise<Product> {
//     return this.productService.getProductByName(name);
//   }

//   @Mutation(() => Product, { name: 'createProduct'})
//   async createProduct(@Args('data') createProductDto: CreateProductDto): Promise<Product> {
//     return this.productService.createProduct(createProductDto);
//   }

//   @Mutation(returns => Product, { nullable: true })
//   async deleteProduct(
//     @Args({ name: 'id', type: () => string }) id: string,
//   ) {
//     return this.productService.deleteProduct(id);
//   }
// }
