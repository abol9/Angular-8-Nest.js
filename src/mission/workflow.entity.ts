import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MissionEntity } from "./mission.entity";

@Entity('workflow')
export class WorkFlowEntity {
    @PrimaryGeneratedColumn()
    workflowID: number;

    @Column()
    title: string;

    @OneToMany(type=>MissionEntity,mission=>mission.workFlow)
    missions: MissionEntity[];
}