import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Supplier extends Document {
  @ApiProperty({
    description: 'The name of the supplier',
    example: 'FireSafe Supplies Ltd.',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'The address of the supplier',
    example: '123 Fire Safety Street, NY, USA',
    required: false,
  })
  @Prop()
  address: string;

  @ApiProperty({
    description: 'The contact person for the supplier',
    example: 'John Doe',
    required: false,
  })
  @Prop()
  contactPerson: string;

  @ApiProperty({
    description: 'The phone number of the supplier',
    example: '+1 555-1234-567',
    required: false,
  })
  @Prop()
  phoneNumber: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
