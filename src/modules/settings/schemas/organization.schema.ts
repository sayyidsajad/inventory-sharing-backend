import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ContactInfo {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);

@Schema({ timestamps: true })
export class Organization extends Document {
  @Prop({ required: true })
  organizationName: string;

  @Prop()
  imageLink: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: ContactInfoSchema, _id: false })
  primaryContact: ContactInfo;

  @Prop({ type: ContactInfoSchema, _id: false })
  secondaryContact?: ContactInfo;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
