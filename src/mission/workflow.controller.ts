import { Controller, Get, Post, Put, Body, Delete, Param } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { UpdateWorkFlowDto } from './dto/update-workflow.dto';
import { CreateWorkFlowDto } from './dto/create-workflow.dto';

@Controller('workflow')
export class WorkflowController {
    constructor(private workflowService:WorkflowService){}
    @Get()
    async find(){
        return await this.workflowService.findAll();
    }

    @Post()
    async create(@Body() workflowDto:CreateWorkFlowDto){
        return await this.workflowService.createWorkFlow(workflowDto);
    }
    @Put()
    async update(@Body() workflowDto:UpdateWorkFlowDto){
        return await this.workflowService.UpdateWorkFlow(workflowDto);
    }
    @Get(':id/delete')
    async deleted(@Param(':id') id:number){
        return await this.workflowService.deleteWork(id);
    }
}
