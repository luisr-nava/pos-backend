import { Module } from '@nestjs/common';
import { TrasactionsService } from './transactions.service';
import { TrasactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Transaction,
  TransactionContents,
} from './entities/transaction.entity';
import { Product } from '../products/entities/product.entity';
import { CouponsModule } from '../cupons/coupons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionContents, Product]),
    CouponsModule,
  ],
  controllers: [TrasactionsController],
  providers: [TrasactionsService],
})
export class TrasactionsModule {}
