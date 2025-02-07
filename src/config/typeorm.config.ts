import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity'
config();

const configService = new ConfigService();


const AppDataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Maverick123&',
        database: 'Usermanagementsystem',
        entities: [User],
        synchronize: false,
        // migrationsRun: true,
        migrations: ['src/database/migrations/*-migration.ts'],
        // logging: true
});

export default AppDataSource;