import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MissionService } from './mission.service';
import { WorkflowService } from './workflow.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { OrganService } from '../organ/organ.service';
import { addFormDto } from './dto/add-form.dto';

@Controller('mission')
export class MissionController {
    constructor(private missionService: MissionService,private workflowService:WorkflowService,private organService:OrganService){}
    @Get()
    async find(){
        return await this.missionService.findAll();
    }
    @Get(":id")
    async findID(@Param('id') missionID:number){
        return await this.missionService.findID(missionID);
    }
    @Post()
    async createMission(@Body() missionDto:CreateMissionDto){
        return await this.missionService.createMission(missionDto)
    }
    @Put()
    async updateMission(@Body() missionUpdate:UpdateMissionDto){
        return await this.missionService.updateMission(missionUpdate);
    }
    @Post('addForm')
    async addForm(@Body() addForm:addFormDto ){
        return await this.missionService.addForm(addForm.missionID,addForm.formID);
    }
    // @Delete(':id/delete')
    // async delete(){
    //     return await this.
    // }
    
}
