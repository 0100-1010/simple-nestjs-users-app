import mongoose from 'mongoose';
import {
  // ValidationPipe,
  HttpException,
  // UsePipes,
  Controller,
  Delete,
  Patch,
  Param,
  Body,
  Post,
  Get,
} from '@nestjs/common';

import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  /*
   * if just using validation on this controller
   * then use @UsePipes(new ValidationPipe())
   * but we're applying validation to all, so check
   * main.ts where we use app.useGlobalPipes(new ValidationPipe());
   */
  // @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // users/:id
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('User not found', 404);
    const user = await this.usersService.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid ID', 400);
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new HttpException('Could not update user', 400);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid ID', 400);
    const deletedUser = await this.usersService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return deletedUser;
  }
}
