import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @ApiProperty({
    example: 'user',
    description: 'User role',
    enum: ['admin', 'user'],
    default: 'user',
  })
  @Prop({ type: String, enum: ['admin', 'user'], default: 'user' })
  role: string;

  @ApiProperty({
    example: '660e5d1f2a3b4c001f4d5b99',
    description: 'Organization ID',
    required: false,
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organization' })
  organization?: MongooseSchema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
