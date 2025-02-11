import { Controller, Get, Post, Body, Patch, Param, Delete,  UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { status } from './dto/StatusSwitchModel';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('CreateUser')
  @UsePipes(new ValidationPipe()) 
  createUser(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUserAsync(createUserDto);
  }

  @Put('UserStatusSwitcher')
  UserStatusSwitcher(@Body() Email: status){
    // console.log("Test");
    return this.usersService.UserStatusSwitcherAsync(Email);
  }

  @Get('DashBoardMetric')
  DashboardMetric()
  {
    return this.usersService.DashboardMetricAsync();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
