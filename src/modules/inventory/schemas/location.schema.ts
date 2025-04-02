import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Location extends Document {
  @Prop({ required: true })
  siteStationName: string;

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
}

export const LocationSchema = SchemaFactory.createForClass(Location);
