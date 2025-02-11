import { ApiProperty } from '@nestjs/swagger';

export class FilterById{
    @ApiProperty({ example: 'string' })
    Id: string
}