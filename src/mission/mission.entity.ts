import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, OneToMany, ManyToMany } from "typeorm";
import { WorkFlowEntity } from "./workflow.entity";
import { AuthorizedOrganEntity } from "../organ/authorized-organ.entity";
import { FormEntity } from "../form/form.entity";
import { InterviewEntity } from "../interview/interview.entity";

@Entity('mission')
export class MissionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(type => WorkFlowEntity,work => work.missions)
    @JoinTable()
    workFlow: WorkFlowEntity;

    @Column({default:false})
    active: boolean;

    @Column({default:''})
    description: string;

    @OneToMany(type=>AuthorizedOrganEntity,authorizeOrgan=>authorizeOrgan.mission)
    authorizes:AuthorizedOrganEntity[];

    @OneToMany(type=>InterviewEntity,interview=>interview.mission)
    interviews:InterviewEntity[];

    @ManyToMany(type=>FormEntity)
    @JoinTable()
    forms: FormEntity[];


}