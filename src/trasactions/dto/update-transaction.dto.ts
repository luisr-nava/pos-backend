import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTrasactionDto extends PartialType(CreateTransactionDto) {}
