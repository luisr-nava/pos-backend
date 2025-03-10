import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TrasactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTrasactionDto } from './dto/update-transaction.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('transactions')
export class TrasactionsController {
  constructor(private readonly trasactionsService: TrasactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.trasactionsService.create(createTransactionDto);
  }

  @Get()
  findAll(@Query('transactionDate') transactionDate: string) {
    return this.trasactionsService.findAll(transactionDate);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.trasactionsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.trasactionsService.remove(+id);
  }
}
