import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller('interview')
export class InterviewController {
    constructor(public interviewService:InterviewService){

    }
    @Get()
    async find(){
        return await this.interviewService.findAll();
    }
    @Post('create')
    async create(@Body() interview:CreateInterviewDto){
        return await this.interviewService.create(interview);
    }
    @Post('addPerson')
    async addPerson(@Body() param){
        return await this.interviewService.addPerson(param.personID,param.interviewID)
    }
    @Get(':id/persons')
    async persons(@Param('id') id:number){
        return await this.interviewService.interviewPersons(id);
    }

}
@Controller('person')
export class PersonController {
    constructor(public interviewService:InterviewService){}
    @Post('create')
    async create(@Body() personDto:CreatePersonDto){
        return await this.interviewService.createPerson(personDto);
    }
    @Get()
    async findAll(){
        return this.interviewService.Persons();
    }
}

