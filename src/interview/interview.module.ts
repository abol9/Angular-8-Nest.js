import { Module } from '@nestjs/common';
import { InterviewController, PersonController } from './interview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewEntity } from './interview.entity';
import { InterviewService } from './interview.service';
import { PersonEntity } from './person.entity';
import { MissionEntity } from '../mission/mission.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MissionEntity,InterviewEntity,PersonEntity])],
  controllers: [InterviewController,PersonController],
  providers: [InterviewService]
})
export class InterviewModule {}
