import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

@EntityRepository(Product)
export class ProdutoRepository extends Repository<Product> {}