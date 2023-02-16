import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async getAllProducts(): Promise<Array<Product>> {
    return this.productRepository.find({});
  }
  
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }

  async getProduct(conditions: FindConditions<Product>): Promise<Product> {
    const product = await this.productRepository.findOne(conditions);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async deleteProduct(getProductDto: GetProductDto): Promise<void> {
    const { id } = getProductDto;
    const res = await this.productRepository.delete({ id });

    if (res.affected === 0) {
      throw new NotFoundException(`Product with ID: "${id}" not found`);
    }
  }

  async updateProduct(
    getProductDto: GetProductDto,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { id } = getProductDto;
    const product = await this.getProduct({ id });
    const { name, price } = updateProductDto;

    product.name = name;
    product.price = price;

    await this.productRepository.save(product);

    return product;
  }
}
