import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    Age: number;

    @Column({type: 'date'})
    DateOfBirth: Date;

    @Column()
    Email: string;

    @Column()
    Address: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    CreateAt: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    UpdatedAt: Date;

    @Column()
    IsActive: Boolean = false;

    @Column()
    Password: string;

    @Column()
    TetsPassword: string;

    @Column()
    TesPassword: string;
}
