import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Location extends Document {
  @ApiProperty({
    description: 'The name of the site station',
    example: 'Fire Station 12',
  })
  @Prop({ required: true })
  siteStationName: string;

  @ApiProperty({
    description: 'The room or fire truck where the inventory is stored',
    example: 'Fire Truck A3',
    required: false,
  })
  @Prop()
  roomFireTruck: string;

  @ApiProperty({
    description: 'The aisle number within the storage area',
    example: 'Aisle 5',
    required: false,
  })
  @Prop()
  aisle: string;

  @ApiProperty({
    description: 'The rack identifier in the storage facility',
    example: 'Rack B7',
    required: false,
  })
  @Prop()
  rack: string;

  @ApiProperty({
    description: 'The shelf level in the rack',
    example: 'Level 3',
    required: false,
  })
  @Prop()
  shelfLevel: string;

  @ApiProperty({
    description: 'The bin number for more specific storage location',
    example: 'Bin 12C',
    required: false,
  })
  @Prop()
  bin: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
