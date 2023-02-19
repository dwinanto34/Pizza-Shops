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
  import { UpdateProductDto } from './dto/update-product.dto';
  import { Products } from './product.entity';
  import { ProductService } from './product.service';
  
  @Controller('products')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    @Get()
    getAllProducts(): Promise<Products[]> {
      return this.productService.getAllProducts();
    }
  
    @Post()
    createProduct(@Body() createProductDto: CreateProductDto): Promise<Products> {
      return this.productService.createProduct(createProductDto);
    }
  
    @Get(':name')
    getProduct(@Param('name') name: string): Promise<Products> {
      return this.productService.getProduct({ name });
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string): Promise<boolean> {
      return this.productService.deleteProduct(id);
    }
  
    @Put(':id')
    updateProduct(
      @Param('id') id: string,
      @Body() updateProductDto: UpdateProductDto,
    ): Promise<Products> {
      return this.productService.updateProduct(id, updateProductDto);
    }
  }
  