import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class InventorySharing extends Document {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'ID of the user who shared the inventory',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  sharedBy: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cb',
    description: 'ID of the user with whom the inventory is shared',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  sharedWith: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    example: 'Fire Department',
    description: 'Name of the organization associated with sharing',
    required: false,
  })
  @Prop()
  organizationName?: string;

  @ApiProperty({
    example: '123 Main St, City, Country',
    description: 'Address associated with the shared inventory',
    required: false,
  })
  @Prop()
  address?: string;

  @ApiProperty({
    example: 'Inventory Sharing Request',
    description: 'Subject of the sharing request',
    required: false,
  })
  @Prop()
  subject?: string;

  @ApiProperty({
    example: 'Please review the shared inventory details.',
    description: 'Email body of the sharing request',
    required: false,
  })
  @Prop()
  emailBody?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the sharing is mutual between users',
    default: false,
  })
  @Prop({ default: false })
  mutualSharing?: boolean;

  @ApiProperty({
    example: 'pending',
    description: 'Status of the sharing request',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  @Prop({
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cc',
    description: 'ID of the user who approved the request',
    required: false,
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  approvedBy?: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    example: '2025-03-25T12:34:56.789Z',
    description: 'Date when the request was approved',
    required: false,
  })
  @Prop()
  approvedOn?: Date;

  @ApiProperty({
    example: 'Request approved successfully.',
    description: 'Message associated with the sharing approval or rejection',
    required: false,
  })
  @Prop()
  message?: string;

  @ApiProperty({
    example: '2025-03-24T10:00:00.000Z',
    description: 'Timestamp when the sharing request was created',
    required: false,
  })
  @Prop()
  createdAt?: string;
}

export const InventorySharingSchema =
  SchemaFactory.createForClass(InventorySharing);
