import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class InventorySharing extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  sharedBy: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  sharedWith: MongooseSchema.Types.ObjectId;

  @Prop()
  organizationName?: string;

  @Prop()
  address?: string;

  @Prop()
  subject?: string;

  @Prop()
  emailBody?: string;

  @Prop({ default: false })
  mutualSharing?: boolean;

  @Prop({
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  approvedBy?: MongooseSchema.Types.ObjectId;

  @Prop()
  approvedOn?: Date;

  @Prop()
  message?: string;

  @Prop()
  createdAt?: string;
}

export const InventorySharingSchema =
  SchemaFactory.createForClass(InventorySharing);
