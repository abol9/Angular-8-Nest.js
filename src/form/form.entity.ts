import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FormEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;
}