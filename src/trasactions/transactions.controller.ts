import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrasactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTrasactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TrasactionsController {
  constructor(private readonly trasactionsService: TrasactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.trasactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.trasactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trasactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrasactionDto: UpdateTrasactionDto,
  ) {
    return this.trasactionsService.update(+id, updateTrasactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trasactionsService.remove(+id);
  }
}
