import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { PersonEntity } from './person.entity';
import { MissionEntity } from '../mission/mission.entity';
@Entity('interview') 
export class InterviewEntity {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column()
    title:string;

    @IsNotEmpty()
    @ManyToOne(type => MissionEntity,interview => interview.interviews)
    mission: MissionEntity;

    @Column({default: 0})
    number_of_interviews:number;

    @Column({default: 0})
    registration: number;

    @ManyToMany(type=>PersonEntity)
    @JoinTable()
    persons: PersonEntity[];
    

}