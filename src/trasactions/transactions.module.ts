import { Module } from '@nestjs/common';
import { TrasactionsService } from './transactions.service';
import { TrasactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Transaction,
  TransactionContents,
} from './entities/transaction.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionContents, Product]),
  ],
  controllers: [TrasactionsController],
  providers: [TrasactionsService],
})
export class TrasactionsModule {}
