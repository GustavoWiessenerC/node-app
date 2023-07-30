import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../../src/product/controller/product.controller';
import { ProductService } from '../../../src/product/service/product.service';
import { CreateProductDto } from '../../../src/product/dto/create-product.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            createProduct: jest.fn(),
            getAllProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('createProduct', () => {
    it('should call productService.createProduct with the correct parameters', async () => {
      
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test description',
        price: 10.99,
      };
      const createdProduct = { id: 1, ...createProductDto };
      jest.spyOn(productService, 'createProduct').mockResolvedValue(createdProduct);

      const result = await controller.createProduct(createProductDto);

      expect(result).toEqual(createdProduct);
      expect(productService.createProduct).toHaveBeenCalledWith(createProductDto);
    });

    it('should throw an HttpException if productService.createProduct throws an error', async () => {
  
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test description',
        price: 10.99,
      };
      const errorMessage = 'Error creating product';
      jest.spyOn(productService, 'createProduct').mockRejectedValue(new Error(errorMessage));


      await expect(controller.createProduct(createProductDto)).rejects.toThrowError(
        new HttpException(errorMessage, HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('getAllProducts', () => {
    it('should call productService.getAllProducts and return an array of products', async () => {
    
      const products = [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 9.99 },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 19.99 },
      ];
      jest.spyOn(productService, 'getAllProducts').mockResolvedValue(products);

      const result = await controller.getAllProducts();

      expect(result).toEqual(products);
      expect(productService.getAllProducts).toHaveBeenCalled();
    });
  });
});
