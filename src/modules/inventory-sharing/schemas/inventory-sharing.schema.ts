import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InventorySharingDocument = InventorySharing & Document;

@Schema({ timestamps: true })
export class InventorySharing {
  @Prop({ required: true })
  supplierId: string;

  @Prop({ required: true })
  buyerId: string;

  @Prop({ required: true })
  itemId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  pricePerUnit: number;

  @Prop({ enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
  status: string;
}

export const InventorySharingSchema =
  SchemaFactory.createForClass(InventorySharing);
