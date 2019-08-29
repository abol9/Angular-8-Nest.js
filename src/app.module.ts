import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterviewModule } from './interview/interview.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewsModule } from './interviews/interviews.module';
import { MissionModule } from './mission/mission.module';
import { OrganModule } from './organ/organ.module';
import { FormModule } from './form/form.module';

@Module({
  imports: [InterviewModule,TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'ostaz',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), InterviewsModule, MissionModule, OrganModule, FormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
