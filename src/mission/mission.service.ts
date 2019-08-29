import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MissionEntity } from './mission.entity';
import { Repository } from 'typeorm';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { WorkFlowEntity } from './workflow.entity';
import { FormEntity } from '../form/form.entity';
import { AuthorizedOrganEntity } from '../organ/authorized-organ.entity';

@Injectable()
export class MissionService {
    constructor(@InjectRepository(MissionEntity) private readonly missionRepository: Repository<MissionEntity>,
    @InjectRepository(WorkFlowEntity) private readonly workflowRepository:Repository<WorkFlowEntity>,
    @InjectRepository(FormEntity) private readonly formRepository:Repository<FormEntity>,
    @InjectRepository(AuthorizedOrganEntity) private readonly authorizedOrganRepository:Repository<AuthorizedOrganEntity>){

    }
    async findAll(){
        var res = await this.missionRepository.createQueryBuilder('mission').leftJoinAndSelect('mission.authorizes','organs').leftJoinAndSelect('mission.forms','forms').leftJoinAndSelect('mission.interviews','interviews').getMany();
        return await {
            state:true,
            data:res
        }
    }
    async createMission(missionDto:CreateMissionDto){
        var mission = new MissionEntity();
        mission.title = missionDto.title;
        mission.authorizes = [];
        mission.forms = [];
        mission.interviews = [];
        var res = await this.missionRepository.save(mission)
        return {
            state:true,
            data:res,
            message:{
                Title:"ایجاد ماموریت با موفقیت انجام شد"
            }
        }
    }
    async updateMission(updateMissionDto:UpdateMissionDto){
        var mission = await this.missionRepository.findOne({id:updateMissionDto.missionID});
        if(mission){
            mission.title = updateMissionDto.title;
            mission.active = updateMissionDto.active;
            mission.description = updateMissionDto.description;
            var workflow = await this.workflowRepository.findOne({workflowID : updateMissionDto.workflowID});
            workflow.missions.push(mission)
            mission.workFlow = workflow;
            var res = this.missionRepository.save(mission);
            this.workflowRepository.save(workflow);
            return {
                state:true,
                data:res
            }
        }
        else {
            return {
                state:false,
                error:"Not Found"
                }
        }
    }
    async addForm(missionID:number,formID:number){
        var mission = await this.missionRepository.findOne({id:missionID});
        var form = await this.formRepository.findOne({id:formID});
        if(form && mission){
        if (Array.isArray(mission.forms)) {
            mission.forms.push(form);
        } else {
            mission.forms = [form];
        }
        
        var res = await this.missionRepository.save(mission);
        return {
            state:true,
            data:res
        }
    }
    else if(!form) {
        return {
            state:false,
            message:{
                Text:"فرم مورد نظر وجود ندارد"
            }
        }
    }
    else if(!mission){
        return {
            state:false,
            message:{
                Text:"ماموریت مورد نظر وجود ندارد"
            }
        }
    }
    }
    async addOrgan(missionID:number,authorizeOrganID:number){
        
    }
    async findID(missionID:number){
        var res = await this.missionRepository.createQueryBuilder('mission').leftJoinAndSelect('mission.authorizes','organs').leftJoinAndSelect('mission.forms','forms').where({id:missionID}).getOne();
        if(res){
            return await {
                state:true,
                data:res
            }
        }
        else
        {
            return {
                state:false,
                error:"Not Found"
            }   
        }
    }
}

