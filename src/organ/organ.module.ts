import { Module } from '@nestjs/common';
import { OrganController } from './organ.controller';
import { OrganService } from './organ.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizedOrganEntity } from './authorized-organ.entity';
import { OrganEntity } from './organ.entity';
import { MissionEntity } from '../mission/mission.entity';
import { WorkFlowEntity } from '../mission/workflow.entity';
import { MissionService } from '../mission/mission.service';
import { FormEntity } from '../form/form.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AuthorizedOrganEntity,WorkFlowEntity,FormEntity,MissionEntity,OrganEntity])],
  controllers: [OrganController],
  providers: [OrganService,MissionService]
})
export class OrganModule {}
