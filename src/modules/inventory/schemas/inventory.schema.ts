import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Inventory extends Document {
  @Prop({ required: true, unique: true })
  equipId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Manufacturer',
    required: true,
  })
  manufacturer: string;

  @Prop()
  skuMpn: string;

  @Prop()
  modelNumber: string;

  @Prop()
  serialNumber: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  sensor1: string;

  @Prop()
  sensor2: string;

  @Prop()
  sensor3: string;

  @Prop()
  sensor4: string;

  @Prop()
  purchasePrice: number;

  @Prop()
  acquisitionDate: Date;

  @Prop()
  insuranceCoverage: string;

  @Prop()
  warrantyExpiryDate: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  supplier: string;

  @Prop()
  purchaseOrder: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Location',
    required: true,
  })
  location: string;

  @Prop()
  roomFireTruck: string;

  @Prop()
  aisle: string;

  @Prop()
  rack: string;

  @Prop()
  shelfLevel: string;

  @Prop()
  bin: string;

  @Prop({ unique: true })
  tagId: string;

  @Prop({
    required: true,
    enum: ['Available', 'Out of Stock', 'Under Maintenance'],
  })
  status: string;

  @Prop()
  depreciationStartDate: Date;

  @Prop()
  depreciationMethod: string;

  @Prop()
  depreciationRate: number;

  @Prop()
  currentValue: number;

  @Prop()
  valueAtDisposal: number;

  @Prop()
  commissionedDate: Date;

  @Prop()
  schedule: string;

  @Prop()
  lastMaintenanceDate: Date;

  @Prop()
  nextMaintenanceDate: Date;

  @Prop({ type: [String] })
  documents: string[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Inventory' }] })
  associatedItems: string[];
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
