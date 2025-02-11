import { IsString, IsNotEmpty, IsEmail, IsUUID, IsDate } from 'class-validator';
import { Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

        @ApiProperty({ example: 'string' })
        @IsString()
        @IsNotEmpty()
        FirstName: string;
    
        @ApiProperty({ example: 'string' })
        @IsString()
        @IsNotEmpty()
        LastName: string;
    
        @ApiProperty({ example: 'Date' })
        DateOfBirth: Date;
    
        @ApiProperty({ example: 'string' })
        @IsEmail()
        Email: string;
    
        @ApiProperty({ example: 'string' })
        Address: string;
    
        @ApiProperty({ example: 'string' })
        @Matches(/^\+?[1-9]\d{1,13}$/, {
            message: 'Phone number must be in valid international format',
          })
        PhoneNumber: string;
}
