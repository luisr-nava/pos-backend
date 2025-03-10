import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { endOfDay, isAfter } from 'date-fns';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  create(createCouponDto: CreateCouponDto) {
    return this.couponRepository.save(createCouponDto);
  }

  findAll() {
    return this.couponRepository.find();
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOneBy({ id });

    if (!coupon) {
      throw new NotFoundException(
        `El coupon con el Id: ${id} no fu encontrado`,
      );
    }

    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.findOne(id);
    Object.assign(coupon, updateCouponDto);
    return await this.couponRepository.save(coupon);
  }

  async remove(id: number) {
    const coupon = await this.findOne(id);

    await this.couponRepository.remove(coupon);

    return { message: `El coupon con el Id: ${id} fue eliminado` };
  }

  async applyCoupon(name: string) {
    const coupon = await this.couponRepository.findOneBy({ name });

    if (!coupon) {
      throw new NotFoundException(
        `El cupon con el nombre: ${name} no fue encontrado`,
      );
    }

    const currentDate = new Date();

    const expirationDate = endOfDay(coupon.expirationDate);

    if (isAfter(currentDate, expirationDate)) {
      throw new UnprocessableEntityException(
        `El cupon con el nombre: ${name} ha expirado`,
      );
    }

    return {
      message: `El cupon con el nombre: ${name} fue aplicado correctamente`,
      ...coupon,
    };
  }
}
