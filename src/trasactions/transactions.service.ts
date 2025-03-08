import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTrasactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Transaction,
  TransactionContents,
} from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class TrasactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents)
    private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    await this.ProductRepository.manager.transaction(
      async (transactionEntityManager) => {
        const transaction = new Transaction();

        const total = createTransactionDto.contents.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        );

        transaction.total = total;

        for (const contents of createTransactionDto.contents) {
          const product = await transactionEntityManager.findOneBy(Product, {
            id: contents.productId,
          });
          const errors = [];
          if (!product) {
            errors.push(
              `El producto con el Id: ${contents.productId} no existe`,
            );
            throw new NotFoundException(errors);
          }

          if (contents.quantity > product.inventory) {
            errors.push(
              `El articulo ${product.name} excede la cantidad disponible`,
            );

            throw new BadRequestException(errors);
          }

          product.inventory -= contents.quantity;

          const transactionContents = new TransactionContents();
          transactionContents.product = product;
          transactionContents.quantity = contents.quantity;
          transactionContents.price = product.price * contents.quantity;
          transactionContents.transaction = transaction;

          await transactionEntityManager.save(transaction);

          await transactionEntityManager.save(transactionContents);
        }
      },
    );
    return 'Venta Almacenada correctamante';
  }

  findAll() {
    return `This action returns all trasactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trasaction`;
  }

  update(id: number, updateTrasactionDto: UpdateTrasactionDto) {
    return `This action updates a #${id} trasaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} trasaction`;
  }
}
