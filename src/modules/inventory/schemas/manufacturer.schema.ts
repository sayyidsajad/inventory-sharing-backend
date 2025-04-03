import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Manufacturer extends Document {
  @ApiProperty({
    description: 'The name of the manufacturer',
    example: 'FireTech Industries',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'The contact email of the manufacturer',
    example: 'support@firetech.com',
    required: false,
  })
  @Prop()
  contactEmail: string;

  @ApiProperty({
    description: 'The phone number of the manufacturer',
    example: '+1 555-9876-321',
    required: false,
  })
  @Prop()
  phoneNumber: string;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
