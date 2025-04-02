import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Supplier extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  contactPerson: string;

  @Prop()
  phoneNumber: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
