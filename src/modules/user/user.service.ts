import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    try {
      const newUser = new this.userModel(data);
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('User already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
