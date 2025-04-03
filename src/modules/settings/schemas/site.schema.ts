import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ContactInfo, ContactInfoSchema } from './organization.schema';

@Schema()
export class Site extends Document {
  @ApiProperty({
    example: 'SITE-001',
    description: 'Unique identifier for the site',
  })
  @Prop({ required: true })
  siteId: string;

  @ApiProperty({
    example: 'Main Fire Station',
    description: 'Name of the site',
  })
  @Prop({ required: true })
  siteName: string;

  @ApiProperty({
    example: 'Fire Station',
    description: 'Type of the site',
  })
  @Prop({ required: true })
  siteType: string;

  @ApiProperty({
    example: '2024-01-15T00:00:00.000Z',
    description: 'Date when the site was commissioned',
    required: false,
  })
  @Prop()
  commissionedOn: Date;

  @ApiProperty({
    example: 'active',
    description: 'Current status of the site',
    enum: ['active', 'inactive', 'under-maintenance'],
  })
  @Prop({
    type: String,
    enum: ['active', 'inactive', 'under-maintenance'],
    required: true,
  })
  status: string;

  @ApiProperty({
    example: '123 Firefighter Lane',
    description: 'Street address of the site',
    required: false,
  })
  @Prop()
  street: string;

  @ApiProperty({
    example: 'New York',
    description: 'City where the site is located',
    required: false,
  })
  @Prop()
  city: string;

  @ApiProperty({
    example: 'NY',
    description: 'State where the site is located',
    required: false,
  })
  @Prop()
  state: string;

  @ApiProperty({
    example: '10001',
    description: 'ZIP code of the site',
    required: false,
  })
  @Prop()
  zip: string;

  @ApiProperty({
    example: { lat: 40.7128, lng: -74.006 },
    description: 'GPS coordinates of the site',
    required: false,
  })
  @Prop({
    type: {
      lat: Number,
      lng: Number,
    },
    required: false,
  })
  gpsCoordinates?: {
    lat: number;
    lng: number;
  };

  @ApiProperty({
    example: '60d0fe4f5311236168a109cc',
    description: 'ID of the organization associated with this site',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Organization',
    required: true,
    index: true,
  })
  organization: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    type: ContactInfo,
    description: 'Primary contact person for the site',
  })
  @Prop({ type: ContactInfoSchema, _id: false })
  primaryContact: ContactInfo;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
