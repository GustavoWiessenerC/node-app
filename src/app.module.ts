
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'mahmud.db.elephantsql.com',
      username: 'qfmpeajm',
      password: '0FZoCoiUJN2jz1LYpLDbnTIDs-dd56v4',
      database: 'qfmpeajm',
      autoLoadEntities: true
    }),
    ProductModule,
  ],
})
export class AppModule {}
