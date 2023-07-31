import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { MethodNotAllowedMiddleware } from './middleware/metodo-now-allowed.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], 
  controllers: [ProductController],
  providers: [ProductService],
})

export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MethodNotAllowedMiddleware).forRoutes('*');
  }
}
