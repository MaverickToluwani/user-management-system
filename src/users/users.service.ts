import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './dto/ResponseObj';
import { HttpStatus } from '@nestjs/common';
import { status } from './dto/StatusSwitchModel';
import { DashboardMetric } from './dto/DashboardMetric';
import { FilterById } from './dto/FilterUserById';

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
      UserResponse.StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      UserResponse.Success = false
      return UserResponse;
    };
  }

  async UserStatusSwitcherAsync(mail: status){
    const UserResponse = new Response<User>;
    try{
          const user = await this.usersRepository.createQueryBuilder()
          .update(User)
          .set({IsActive: true})
          .where("Email = :Email", { Email: mail.Email})
          .execute();

          console.log(user);

          if (user.affected > 0) 
          {
            UserResponse.Data = null;
            UserResponse.Message = "User is now Active";
            UserResponse.StatusCode = HttpStatus.OK;
            UserResponse.Success = true;
          } 
          else 
          {
            UserResponse.Data = null;
            UserResponse.Message = "Error updating user";
            UserResponse.StatusCode = HttpStatus.BAD_REQUEST;
            UserResponse.Success = false
          }

          return UserResponse;
    }
    catch(e)
    {
      UserResponse.Data = e;
      UserResponse.Message = "Error updating user";
      UserResponse.StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      UserResponse.Success = false
      return UserResponse;
    }
  }

  async DashboardMetricAsync(){
    const UserResponse = new Response<DashboardMetric>;
    const ActiveUser = [];
    const InActiveUser = [];
    var Counter = 0;
    const DashBoardData = new DashboardMetric;

    try{
        const user = await this.usersRepository.find({ 
          where: {IsDeleted: false}
        });

        if (user.length > 0)
        {
          user.forEach((value: User) => {

            if (value.IsActive == true)
              ActiveUser.push(value);
            else
              InActiveUser.push(value);

              Counter += 1;
          })
  
          DashBoardData.ActiveUser = ActiveUser;
          DashBoardData.InActiveUser = InActiveUser;
          DashBoardData.TotalUsers = Counter;
  
  
          UserResponse.Data = DashBoardData;
          UserResponse.Message = "DashBoard Data";
          UserResponse.StatusCode = HttpStatus.OK;
          UserResponse.Success = true;
        }
        else
        {
          UserResponse.Data = null;
          UserResponse.Message = "No users";
          UserResponse.StatusCode = HttpStatus.NOT_FOUND;
          UserResponse.Success = false
        }
      
        return UserResponse;
    }
    catch(e)
    {
      UserResponse.Data = e;
      UserResponse.Message = "Error updating user";
      UserResponse.StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      UserResponse.Success = false
      return UserResponse;
    }
  }

  async GetAllUsersAsync(){
    const UserResponse = new Response<any>;

    try{

    
    const user = await this.usersRepository.createQueryBuilder("user")
        .where({IsDeleted: false})
        .select([
          "user.FirstName",
          "user.IsActive",
          "user.CreateAt"
        ]).getRawMany();

        if (user.length > 0)
        {
          UserResponse.Data = user;
          UserResponse.Message = "DashBoard Data";
          UserResponse.StatusCode = HttpStatus.OK;
          UserResponse.Success = true;  
        }
        else
        {
          UserResponse.Data = null;
          UserResponse.Message = "No users";
          UserResponse.StatusCode = HttpStatus.NOT_FOUND;
          UserResponse.Success = false
        }
      
        return UserResponse;
    }
    catch(e)
    {
      UserResponse.Data = e;
      UserResponse.Message = "Error updating user";
      UserResponse.StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      UserResponse.Success = false
      return UserResponse;
    }
  }

  async DeleteUserAsync(Data: FilterById) {

    const UserResponse = new Response<any>;

    try{
      const existingUser = await this.usersRepository.findOne({ where: { id: Data.Id } });
      existingUser.IsDeleted = true;
      const IsUser = await this.usersRepository.save(existingUser);

      if(IsUser)
      {
        UserResponse.Data = null;
        UserResponse.Message = "User Deleted";
        UserResponse.StatusCode = HttpStatus.OK;
        UserResponse.Success = true;
      }
      else{
          UserResponse.Data = null;
          UserResponse.Message = "Error deleting user";
          UserResponse.StatusCode = HttpStatus.NOT_FOUND;
          UserResponse.Success = false
      }
      
      return UserResponse;
    }
    catch(e)
    {
      UserResponse.Data = e;
      UserResponse.Message = "Error updating user";
      UserResponse.StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      UserResponse.Success = false
      return UserResponse;
    }
  }

  async GetUserByIdAsync(Id: string) {
    const UserResponse = new Response<User>;
    try
    {  
      const existingUser = await this.usersRepository.findOne({ where: { id:  Id, } });

      if(existingUser)
      {
        UserResponse.Data = existingUser;
        UserResponse.Message = "User retrieved";
        UserResponse.StatusCode = HttpStatus.OK;
        UserResponse.Success = true;
      }
      else
      {
          UserResponse.Data = null;
          UserResponse.Message = "Error retrieving user";
          UserResponse.StatusCode = HttpStatus.NOT_FOUND;
          UserResponse.Success = false
      }
      
      return UserResponse;
    }
    catch(e)
    {
      UserResponse.Data = e;
      UserResponse.Message = "Error updating user";
      UserResponse.StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      UserResponse.Success = false
      return UserResponse;
    }
  }
}
