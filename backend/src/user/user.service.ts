import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/data-model/entities';
import { Repository } from 'typeorm';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(guestName?: string): Promise<User> {
    const user = this.userRepository.create({
      guestName,
    });
    return this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!id || !user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUserGuestName(id: number, guestName: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new UserNotFoundException();
    }

    if (!guestName.length) {
      throw new HttpException(
        'Guest name requires the be at least 1 character',
        HttpStatus.CONFLICT,
      );
    }
    user.guestName = guestName;
    return this.userRepository.save(user);
  }
}
