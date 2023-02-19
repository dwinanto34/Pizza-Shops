import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async getAllProducts(): Promise<Array<Products>> {
    return this.productRepository.find({});
  }
  
  async createProduct(createProductDto: CreateProductDto): Promise<Products> {
    return this.productRepository.createProduct(createProductDto);
  }

  async getProduct(conditions: FindConditions<Products>): Promise<Products> {
    const product = await this.productRepository.findOne(conditions);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const res = await this.productRepository.delete({ id });

    if (res.affected === 0) {
      throw new NotFoundException(`Product with ID: "${id}" not found`);
    }

    return true
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    const product = await this.getProduct({ id });
    const { name, price } = updateProductDto;

    product.name = name;
    product.price = price;

    await this.productRepository.save(product);

    return product;
  }
}
