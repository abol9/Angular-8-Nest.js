import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Min, Max } from "class-validator";

@Entity('interviews')
export class interviewsEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    national_code:string;

    @Column()
    mobile:string;

    @Min(0)
    @Max(20)
    @Column({type:"float"})
    score: number

    @Column()
    status:string;
}