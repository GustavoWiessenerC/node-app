import { Controller, Post, Get, Body, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) 
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productService.createProduct(createProductDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }
}
