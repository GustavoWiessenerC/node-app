import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../../../src/product/entity/product.entity';
import { Repository } from 'typeorm';

describe('Product Entity', () => {
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    const product = new Product();
    expect(product).toBeDefined();
  });

  it('should have valid properties', () => {
    const product = new Product();
    product.id = 1;
    product.name = 'Test Product';
    product.description = 'Test description';
    product.price = 10.99;

    expect(product.id).toEqual(1);
    expect(product.name).toEqual('Test Product');
    expect(product.description).toEqual('Test description');
    expect(product.price).toEqual(10.99);
  });


});
