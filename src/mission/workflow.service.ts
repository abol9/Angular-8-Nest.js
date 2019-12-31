import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkFlowEntity } from './workflow.entity';
import { Repository } from 'typeorm';
import { CreateWorkFlowDto } from './dto/create-workflow.dto';
import { UpdateWorkFlowDto } from './dto/update-workflow.dto';

@Injectable()
export class WorkflowService {
    constructor(@InjectRepository(WorkFlowEntity) private readonly workflowRepository : Repository<WorkFlowEntity>){}
    
    async createWorkFlow(workflowDto:CreateWorkFlowDto){
        const newwork = new WorkFlowEntity()
        newwork.missions = [];
        newwork.title = workflowDto.title;
        var workflow = await this.workflowRepository.save(newwork);   
        return {
            state:true,
            data:workflow
        }
    }
    async UpdateWorkFlow(workFlowUpdate:UpdateWorkFlowDto){
        var workflow = await this.workflowRepository.findOne(workFlowUpdate.workflowID);
        if(workflow){
        workflow.title = workFlowUpdate.title;
        workflow.missions = [];
        var res = await this.workflowRepository.save(workflow);
        return {
            state:true,
            data:res
        }
    }else {
        return {state:false,
            error:"Not Found"
            }
    }
    }
    async deleteWork(id:number){
        const workflow = await this.workflowRepository.delete(id);
        return{
            state:true,
            data:workflow
        } 
    }
    async findAll(){
        var res = await this.workflowRepository.createQueryBuilder('workflow').leftJoinAndSelect('workflow.missions','missions').getMany();
        return {
            state:true,
            data:res
        }
    }
}
