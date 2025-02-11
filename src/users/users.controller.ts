import { Controller, Get, Post, Body, Patch, Param, Delete,  UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { status } from './dto/StatusSwitchModel';
import { FilterById } from './dto/FilterUserById';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';;


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('CreateUser')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a new user' }) // Swagger description
  @ApiResponse({ status: 201, description: 'User created successfully' })
  createUser(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUserAsync(createUserDto);
  }

  @Put('UserStatusSwitcher')
  @ApiOperation({ summary: 'Activate User status' }) // Swagger description
  @ApiResponse({ status: 200, description: 'User Activated successfully' })
  UserStatusSwitcher(@Body() Email: status){
    // console.log("Test");
    return this.usersService.UserStatusSwitcherAsync(Email);
  }

  @Get('DashBoardMetric')
  @ApiOperation({ summary: 'Retrieve User Data ' }) // Swagger description
  @ApiResponse({ status: 200, description: 'Users Data retrieved successfully' })
  DashboardMetric()
  {
    return this.usersService.DashboardMetricAsync();
  }

  @Get('GetAllUsersDTO')
  @ApiOperation({ summary: 'Retrieve User ' }) // Swagger description
  @ApiResponse({ status: 200, description: 'Users Data retrieved successfully' })
  GetAllUsersAsync() {
    return this.usersService.GetAllUsersAsync();
  }

  @Get("DeleteUser")
  @ApiOperation({ summary: 'Delete a User ' }) // Swagger description
  @ApiResponse({ status: 200, description: 'Users deleted successfully' })
  DeleteUser(@Body() Request: FilterById){
    return this.usersService.DeleteUserAsync(Request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve User by id ' }) // Swagger description
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.usersService.GetUserByIdAsync(id);
  }
}
