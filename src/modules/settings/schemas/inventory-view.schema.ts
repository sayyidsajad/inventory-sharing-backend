import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type InventoryViewDocument = InventoryView & Document;

class Field {
  @ApiProperty({
    example: 'Serial Number',
    description: 'The name of the field',
  })
  @Prop({ required: true })
  fieldName: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the field is selected by default',
    default: true,
  })
  @Prop({ default: true })
  isSelected: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates if the field is disabled',
    default: false,
  })
  @Prop({ default: false })
  isDisabled: boolean;
}

@Schema({ timestamps: true })
export class InventoryView {
  @ApiProperty({
    example: 'General Information',
    description: 'The name of the section in the inventory view',
  })
  @Prop({ required: true })
  sectionName: string;

  @ApiProperty({
    example: 1,
    description: 'The order in which this section appears',
  })
  @Prop({ required: true })
  order: number;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the section can be reordered',
    default: true,
  })
  @Prop({ default: true })
  isReorderable: boolean;

  @ApiProperty({
    type: [Field],
    description: 'List of fields contained in this section',
    example: [
      {
        fieldName: 'Serial Number',
        isSelected: true,
        isDisabled: false,
      },
      {
        fieldName: 'Purchase Date',
        isSelected: false,
        isDisabled: false,
      },
    ],
  })
  @Prop({ type: [Field], default: [] })
  fields: Field[];
}

export const InventoryViewSchema = SchemaFactory.createForClass(InventoryView);
