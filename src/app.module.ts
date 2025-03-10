import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { TrasactionsModule } from './trasactions/transactions.module';
import { CouponsModule } from './cupons/coupons.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    CategoriesModule,
    ProductsModule,
    TrasactionsModule,
    CouponsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
