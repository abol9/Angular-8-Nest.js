import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { OrganService } from './organ.service';
import { CreateOrganDto } from './dto/create-organ.dto';
import { CreateAuthorizedOrganDto } from './dto/create-authorized-organ.dto';

@Controller('organ')
export class OrganController {
    constructor(private organService:OrganService){

    }
    @Get()
    async find(){
        return await this.organService.findOrgan();
    }
    @Post()
    async createOrgan(@Body() organDto:CreateOrganDto){
        return await this.organService.createOrgan(organDto);
    }
    @Get('authorizes')
    async show(){
        return this.organService.findAllAuthorizes();
    }
    @Post('addAuthorize')
    async createAuthorize(@Body() OrganAuthorizeDto:CreateAuthorizedOrganDto){
        return await this.organService.createAuthorizeOrgan(OrganAuthorizeDto);
    }
}
