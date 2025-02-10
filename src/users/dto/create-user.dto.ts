import { IsString, IsNotEmpty, IsEmail, IsUUID, IsDate } from 'class-validator';
import { Matches } from 'class-validator';

export class CreateUserDto {

        @IsString()
        @IsNotEmpty()
        FirstName: string;
    
        @IsString()
        @IsNotEmpty()
        LastName: string;
    
        DateOfBirth: Date;
    
        @IsEmail()
        Email: string;
    
        Address: string;
    
        @Matches(/^\+?[1-9]\d{1,13}$/, {
            message: 'Phone number must be in valid international format',
          })
        PhoneNumber: string;
}
