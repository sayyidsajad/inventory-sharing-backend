import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ContactInfo, ContactInfoSchema } from './organization.schema';

@Schema()
export class Site extends Document {
  @Prop({ required: true })
  siteId: string;

  @Prop({ required: true })
  siteName: string;

  @Prop({ required: true })
  siteType: string;

  @Prop()
  commissionedOn: Date;

  @Prop({
    type: String,
    enum: ['active', 'inactive', 'under-maintenance'],
    required: true,
  })
  status: string;

  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip: string;

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

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Organization',
    required: true,
    index: true,
  })
  organization: MongooseSchema.Types.ObjectId;

  @Prop({ type: ContactInfoSchema, _id: false })
  primaryContact: ContactInfo;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
