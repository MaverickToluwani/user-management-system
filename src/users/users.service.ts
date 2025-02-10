import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './dto/ResponseObj';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUserAsync(createUserDto: CreateUserDto) {

    const UserResponse = new Response<User>

    try
    {
      const UserData = new User(createUserDto.FirstName,
        createUserDto.LastName, createUserDto.DateOfBirth,
        createUserDto.Email, createUserDto.Address,
        createUserDto.PhoneNumber
        );
    
        const user = await this.usersRepository.create(UserData);
    
        await this.usersRepository.save(user)

        UserResponse.Data = UserData;
        UserResponse.Message = "User Created Successfully";
        UserResponse.StatusCode = HttpStatus.CREATED;
        UserResponse.Success = true;

        return UserResponse;
    }
    catch(e){
      UserResponse.Data = e;
      UserResponse.Message = "Error Creating User";
      UserResponse.StatusCode = HttpStatus.BAD_REQUEST;
      UserResponse.Success = false
      return UserResponse;
    };
  }

  ActiveSwitch(){

  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
