import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/data-model/entities';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find')
  async findUser(
    @Query()
    { userId },
  ): Promise<User> {
    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      throw new UserNotFoundException();
    }
    return foundUser;
  }

  @Post()
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto?.guestName);
  }

  @Put()
  updateUser(
    @Body()
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUserGuestName(
      updateUserDto.userId,
      updateUserDto.guestName,
    );
  }

  @Put('/upsert')
  upsertUser(
    @Body()
    body: {
      guestName: string;
      userId?: number;
    },
  ): Promise<User> {
    const { guestName, userId } = body;
    return this.userService.upsertUser(userId, guestName);
  }
}
