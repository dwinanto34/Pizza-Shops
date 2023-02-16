import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateProductDto } from './dto/create-product.dto';
  import { GetProductDto } from './dto/get-product.dto';
  import { UpdateProductDto } from './dto/update-product.dto';
  import { Product } from './product.entity';
  import { ProductService } from './product.service';
  
  @Controller('product')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    @Get()
    getAllProducts(): Promise<Product[]> {
      return this.productService.getAllProducts();
    }
  
    @Post()
    createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
      return this.productService.createProduct(createProductDto);
    }
  
    @Delete('/:id')
    deleteProduct(@Param() getProductDto: GetProductDto): Promise<void> {
      return this.productService.deleteProduct(getProductDto);
    }
  
    @Put('/:id')
    updateProduct(
      @Param() getProductDto: GetProductDto,
      @Body() updateProductDto: UpdateProductDto,
    ): Promise<Product> {
      return this.productService.updateProduct(getProductDto, updateProductDto);
    }
  }
  