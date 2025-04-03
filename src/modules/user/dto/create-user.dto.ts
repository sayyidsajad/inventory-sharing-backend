import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'user',
    description: 'User role',
    enum: ['admin', 'user'],
    default: 'user',
  })
  @IsEnum(['admin', 'user'])
  role?: 'admin' | 'user';

  @ApiProperty({
    example: '660e5d1f2a3b4c001f4d5b99',
    description: 'Organization ID',
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  organization?: Types.ObjectId;
}
