import { User } from "../entities/user.entity";
import { ApiProperty } from '@nestjs/swagger';

export class DashboardMetric{
    @ApiProperty({ example: '[]' })
    ActiveUser: User[] = [];

    @ApiProperty({ example: '[]' })
    InActiveUser: User[] = [];

    @ApiProperty({ example: 'int' })
    TotalUsers: number = 0;

}