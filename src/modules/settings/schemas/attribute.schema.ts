import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AttributeDocument = Attribute & Document;

@Schema({ timestamps: true })
export class Attribute {
  @ApiProperty({
    example: 'Color',
    description: 'The unique name of the attribute',
  })
  @Prop({ required: true, unique: true, trim: true })
  attributeName: string;

  @ApiProperty({
    example: 'Defines the available colors for products',
    description: 'A brief description of the attribute',
    required: false,
  })
  @Prop({ trim: true })
  description?: string;

  @ApiProperty({
    example: 'Dropdown',
    description: 'The data type of the attribute',
    enum: ['Dropdown', 'Number', 'Date', 'SingleChoice'],
  })
  @Prop({
    type: String,
    enum: ['Dropdown', 'Number', 'Date', 'SingleChoice'],
    required: true,
  })
  dataType: string;

  @ApiProperty({
    example: ['Red', 'Blue', 'Green'],
    description:
      'List of predefined values (only applicable for Dropdown or SingleChoice data types)',
    required: false,
  })
  @Prop({
    type: [String],
    default: [],
    validate: {
      validator: function (values: string[]) {
        return this.dataType === 'Dropdown' || this.dataType === 'SingleChoice'
          ? values.length > 0
          : values.length === 0;
      },
      message:
        'Values are only allowed for Dropdown or SingleChoice data types',
    },
  })
  values?: string[];
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
