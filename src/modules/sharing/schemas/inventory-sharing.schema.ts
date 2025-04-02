import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum SharingStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class InventorySharing extends Document {
  @Prop({ required: true })
  inventoryId: string;

  @Prop({ required: true })
  sharedBy: string;

  @Prop({ required: true })
  sharedWith: string;

  @Prop({ required: true, enum: SharingStatus, default: SharingStatus.PENDING })
  status: SharingStatus;
}

export const InventorySharingSchema =
  SchemaFactory.createForClass(InventorySharing);
