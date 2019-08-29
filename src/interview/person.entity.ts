import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, ManyToOne } from "typeorm";
import { Min, Max } from "class-validator";

@Entity('person')
export class PersonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    national_code: string;

    
    @Column()
    mobile: string;

    @Min(0)
    @Max(20)
    @Column()
    score: number

    @Column({default:'تست نشده'})
    status:string;

}