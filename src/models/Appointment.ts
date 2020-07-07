import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

//decoretor
@Entity('appointments')
export default class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;
    
    @Column('timestamp')
    date: Date;
}