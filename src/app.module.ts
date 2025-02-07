import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './users/entities/user.entity'

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Maverick123&',
      database: 'Usermanagementsystem',
      entities: [User],
      synchronize: false,  // Don't auto sync
      // migrationsRun: true, // Run migrations automatically on app startup
      // // migrations: ['src/database/migrations/*-migration.ts'],  // Path to migration files
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
