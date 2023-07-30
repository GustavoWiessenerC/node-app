import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProdutoRepository } from '../../../src/product/repository/product.repository';
import { Repository } from 'typeorm';
import { Product } from '../../../src/product/entity/product.entity';

describe('ProdutoRepository', () => {
  let produtoRepository: ProdutoRepository;
  let baseRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoRepository,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    produtoRepository = module.get<ProdutoRepository>(ProdutoRepository);
    baseRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(produtoRepository).toBeDefined();
  });

});
