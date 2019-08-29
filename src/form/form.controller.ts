import { Controller, Get, Post, Body } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';

@Controller('form')
export class FormController {
    constructor(private formService:FormService){}
    @Get()
    async find(){
        return await this.formService.findAll();
    }

    @Post()
    async create(@Body() form:CreateFormDto){
        return await this.formService.create(form);
    }
}
