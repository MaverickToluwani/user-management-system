import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column({type: 'date'})
    DateOfBirth: Date;

    @Column()
    Email: string;

    @Column({nullable: true})
    Address: string;

    @Column()
    PhoneNumber: string;

    @Column()
    Role: string = "General";

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    CreateAt: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    UpdatedAt: Date;

    @Column({ type: 'boolean', default: false })
    IsActive: boolean = false;

    @Column({ type: 'boolean', default: false })
    IsDeleted: boolean = false;

    constructor(FirstName: string, 
        LastName: string, DOB: Date, Email: string,
        Address: string, PhoneNumber: string
    )
    {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.DateOfBirth = DOB;
        this.Email = Email;
        this.Address = Address;
        this.PhoneNumber = PhoneNumber
    }
}
