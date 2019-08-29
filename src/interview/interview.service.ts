import { Injectable } from '@nestjs/common';
import { InterviewEntity } from './interview.entity';
import { Repository } from 'typeorm';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity } from './person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { MissionEntity } from '../mission/mission.entity';

@Injectable()
export class InterviewService {
    constructor(@InjectRepository(InterviewEntity) private readonly interviewRepository : Repository<InterviewEntity>
    ,@InjectRepository(MissionEntity) private readonly missionRepository : Repository<MissionEntity>,
    @InjectRepository(PersonEntity) private readonly personRepository:Repository<PersonEntity>){

    }
    async findAll(){
        var interviews = await this.interviewRepository.createQueryBuilder('interview')
        .leftJoinAndSelect('interview.mission','mission').leftJoinAndSelect('interview.persons','persons').getMany();
        // var interviews = await this.interviewRepository.find()
        // var result = Array();
        // for(let interview of interviews)
        // {
        //     var view = {
        //         title: interview.title,
        //         mission:interview.mission,
        //         number_of_interviews: interview.number_of_interviews,
        //         registration: interview.registration,
        //     }
        //     result.push(view);
        // }
        var response = {
            data:interviews,
            state:true,
        }
        return await response;
}
async create(createInterview: CreateInterviewDto){
    // var mission = this.missionTypeRepository.find({value:mission})
    // var interview = await this.interviewRepository.save(createInterview);
    // return {
    //     data:interview,
    //     state:true,
    //     message:{
    //         Title:"با موفقیت انجام شد"
    //     }
    // }
    const mission = await this.missionRepository.findOne(createInterview.mission);
    let interview = new InterviewEntity();
    interview.title = createInterview.title;
    interview.number_of_interviews = createInterview.number_of_interviews;
    // interview.slug = this.slugify(createInterview.title);
    interview.registration = createInterview.registation;
    interview.mission = mission;
    const newinterview = await this.interviewRepository.save(interview);

    // const mission = await this.missionRepository.findOne(createInterview.mission);
    // if (Array.isArray(mission.interviews)) {
    //   mission.interviews.push(interview);
    // } else {
    //   mission.interviews = [interview];
    // }

    // var resmis = await this.missionRepository.save(mission);
    return {
        state: true,
        data: [newinterview],
        message:{
            Title:"ذخیره با موفقیت انجام شد ."
        }
    }
}
async createPerson(personDto:CreatePersonDto){
    var person = new PersonEntity()
    person.name = personDto.name;
    person.national_code = personDto.national_code;
    person.score = personDto.score;
    person.mobile = personDto.mobile;
    person.status = personDto.status
    const newperson = await this.personRepository.save(person);
    return {
        state:true,
        data:newperson,
        message:{
            Title:"ذخیره با موفقیت انجام شد "
        }
    };
}
async addPerson(personID:number,interviewID:number){
    const person = await this.personRepository.findOne({ where: { id: personID } });
    const interview = await this.interviewRepository.findOne({ where: { id: interviewID } });
    if (Array.isArray(interview.persons)) {
        interview.persons.push(person);
      } else {
        interview.persons = [person];
      }
        this.interviewRepository.save(interview);
      return {
          state:true,
          data:[interview],
          message:{
              Title:"با موفقیت انجام شد"
          }
      }
}
async Persons(){
    var person = await this.personRepository.find();
    return {
        state: true,
        data: person
    }
}
async interviewPersons(interviewID){
    const interview = await this.interviewRepository.findOne({ where: { id: interviewID } });
    return {
        state:true,
        data: interview
    }
}
}
