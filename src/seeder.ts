import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder/seeder.service';
import { SeederModule } from './seeder/seeder.module';

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);

  const seeder = app.get(SeederService);

  await seeder.seed();

  await app.close();
}
bootstrap();
