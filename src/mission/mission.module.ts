import { Module } from '@nestjs/common';
import { MissionController } from './mission.controller';
import { MissionService } from './mission.service';
import { WorkflowService } from './workflow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionEntity } from './mission.entity';
import { WorkFlowEntity } from './workflow.entity';
import { AuthorizedOrganEntity } from '../organ/authorized-organ.entity';
import { FormEntity } from '../form/form.entity';
import { OrganService } from '../organ/organ.service';
import { OrganEntity } from '../organ/organ.entity';
import { WorkflowController } from './workflow.controller';

@Module({
  imports:[TypeOrmModule.forFeature([MissionEntity,WorkFlowEntity,AuthorizedOrganEntity,FormEntity,OrganEntity])],
  controllers: [MissionController, WorkflowController],
  providers: [MissionService, WorkflowService,OrganService]
})
export class MissionModule {}
