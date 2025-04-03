import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttributeDocument = Attribute & Document;

@Schema({ timestamps: true })
export class Attribute {
  @Prop({ required: true, unique: true })
  attributeName: string;

  @Prop()
  description?: string;

  @Prop({
    type: String,
    enum: ['Dropdown', 'Number', 'Date', 'SingleChoice'],
    required: true,
  })
  dataType: string;

  @Prop({ type: [String], default: [] })
  values?: string[];
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
