import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from './form.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FormEntity])],
  controllers: [FormController],
  providers: [FormService]
})
export class FormModule {}
