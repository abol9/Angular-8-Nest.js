import { Injectable } from '@nestjs/common';
import { FormEntity } from './form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormService {
    constructor(@InjectRepository(FormEntity) private readonly formRepository:Repository<FormEntity>){}
    async create(createFormDto:CreateFormDto){
        var form = new FormEntity();
        form.title = createFormDto.title;
        var res = await this.formRepository.save(form);
        return {
            state:true,
            data:res
        }
        }
    async findAll(){
        var forms = this.formRepository.find();
        return {
            state:true,
            data:forms
        }
    }
}
