import { Injectable } from '@nestjs/common';
import { AuthorizedOrganEntity } from './authorized-organ.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MissionService } from '../mission/mission.service';
import { CreateAuthorizedOrganDto } from './dto/create-authorized-organ.dto';
import { OrganEntity } from './organ.entity';
import { CreateOrganDto } from './dto/create-organ.dto';
import { MissionEntity } from '../mission/mission.entity';

@Injectable()
export class OrganService {
    constructor(@InjectRepository(AuthorizedOrganEntity) private readonly authorizedOrganRepository:Repository<AuthorizedOrganEntity>,
    public missioService:MissionService,
    @InjectRepository(OrganEntity) private readonly organRepository:Repository<OrganEntity>,
    @InjectRepository(MissionEntity) private readonly missionRepository:Repository<MissionEntity>){}
    async createAuthorizeOrgan(authorizeOrganDto:CreateAuthorizedOrganDto){
        var organ = await this.organRepository.findOne({OrganID:authorizeOrganDto.organID});
        if(organ){
        var authorizeOrgan = new AuthorizedOrganEntity();
        authorizeOrgan.start_time = authorizeOrganDto.start_time;
        authorizeOrgan.end_time = authorizeOrganDto.end_time;
        authorizeOrgan.title = authorizeOrganDto.title;
        authorizeOrgan.organ = organ;
        var authorize = await this.authorizedOrganRepository.save(authorizeOrgan);
        await this.organRepository.save(organ);
        var mission = await this.missionRepository.findOne({id:authorizeOrganDto.missionID});
        var organ1 = await this.authorizedOrganRepository.findOne({id:authorizeOrganDto.organID});
        if(mission && organ){
            if(!Array.isArray(mission.authorizes)){ mission.authorizes = new Array()}
            mission.authorizes.push(organ1);
            var res = await this.missionRepository.save(mission);
            return {
                state:true,
                data:res
            };
        }
        else {
            return { state:false,error:"Not Found Organ Or Mission" }
        }
    }
        else {
            return {
                state:0
            }
        }
    }
    async createOrgan(organDto:CreateOrganDto){
        var organ = new OrganEntity();
        organ.title = organDto.title;
        organ.authorizes = [];
        var res = await this.organRepository.save(organ);
        return {
            state:true,
            data:res
        }
    }
    async findOrgan(){
        var organ = await this.organRepository.createQueryBuilder('organ').leftJoinAndSelect('organ.authorizes','authorizes').getMany();
        return {
            state:true,
            data:organ
        }
    }
    async findAllAuthorizes(){
        return this.authorizedOrganRepository.find();
    }
}
