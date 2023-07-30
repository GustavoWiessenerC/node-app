import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { Product } from '../entity/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) 
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto : CreateProductDto): Promise<Product> {
    
    const { name , description , price } = createProductDto;
    
    const product = this.productRepository.create({
      name,
      description,
      price,
    });
    return this.productRepository.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
