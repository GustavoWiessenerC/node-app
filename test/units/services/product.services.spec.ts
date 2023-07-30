import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../src/product/service/product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../src/product/entity/product.entity';
import { CreateProductDto } from '../../../src/product/dto/create-product.dto';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create and return a product', async () => {
      // Arrange
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test description',
        price: 10.99,
      };
      const createdProduct: Product = {
        id: 1,
        ...createProductDto,
      };
      jest.spyOn(productRepository, 'create').mockReturnValue(createdProduct);
      jest.spyOn(productRepository, 'save').mockResolvedValue(createdProduct);

      // Act
      const result = await productService.createProduct(createProductDto);

      // Assert
      expect(result).toEqual(createdProduct);
      expect(productRepository.create).toHaveBeenCalledWith(createProductDto);
      expect(productRepository.save).toHaveBeenCalledWith(createdProduct);
    });
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      // Arrange
      const products: Product[] = [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 9.99 },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 19.99 },
      ];
      jest.spyOn(productRepository, 'find').mockResolvedValue(products);

      // Act
      const result = await productService.getAllProducts();

      // Assert
      expect(result).toEqual(products);
      expect(productRepository.find).toHaveBeenCalled();
    });
  });
});
