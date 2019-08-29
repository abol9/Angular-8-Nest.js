import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AuthorizedOrganEntity } from "./authorized-organ.entity";

@Entity('organ')
export class OrganEntity {
    @PrimaryGeneratedColumn()
    OrganID:number;

    @Column()
    title: string;

    @OneToMany(type=>AuthorizedOrganEntity,authorizeOrgan => authorizeOrgan.organ)
    authorizes: AuthorizedOrganEntity[];

}