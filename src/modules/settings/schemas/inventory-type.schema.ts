import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type InventoryTypeDocument = InventoryType & Document;

class AttributeReference {
  @ApiProperty({
    example: '60d0fe4f5311236168a109cc',
    description: 'Reference to the attribute',
  })
  attribute: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the attribute is mandatory',
    default: false,
  })
  isMandatory: boolean;
}

@Schema({ timestamps: true })
export class InventoryType {
  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the inventory item type',
  })
  @Prop({ required: true, trim: true })
  itemTypeName: string;

  @ApiProperty({
    example: 'Items related to electronic devices',
    description: 'A brief description of the inventory type',
    required: false,
  })
  @Prop({ trim: true })
  description?: string;

  @ApiProperty({
    type: [AttributeReference],
    description:
      'List of attributes associated with this inventory type, specifying whether each is mandatory',
    example: [
      {
        attribute: '60d0fe4f5311236168a109cc',
        isMandatory: true,
      },
      {
        attribute: '60d0fe4f5311236168a109cd',
        isMandatory: false,
      },
    ],
  })
  @Prop({
    type: [
      {
        attribute: {
          type: MongooseSchema.Types.ObjectId,
          ref: 'Attribute',
          required: true,
        },
        isMandatory: { type: Boolean, default: false },
      },
    ],
    default: [],
  })
  attributes: AttributeReference[];
}

export const InventoryTypeSchema = SchemaFactory.createForClass(InventoryType);
