import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { OrganEntity } from "./organ.entity";
import { MissionEntity } from "../mission/mission.entity";

@Entity('authorized-organ')
export class AuthorizedOrganEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    start_time:string;

    @Column()
    end_time: string;

    @Column()
    title: string;

    @ManyToOne(type=>OrganEntity,organ=>organ.authorizes)
    organ:OrganEntity;

    @ManyToOne(type=>MissionEntity,mission=>mission.authorizes)
    mission:MissionEntity;

}
