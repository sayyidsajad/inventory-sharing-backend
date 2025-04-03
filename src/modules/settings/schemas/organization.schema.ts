import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class ContactInfo {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the contact person',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'Manager',
    description: 'Title or designation of the contact person',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: '+1-234-567-8901',
    description: 'Phone number of the contact person',
  })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the contact person',
  })
  @Prop({ required: true })
  email: string;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);

@Schema({ timestamps: true })
export class Organization extends Document {
  @ApiProperty({
    example: 'Tech Solutions Inc.',
    description: 'The name of the organization',
  })
  @Prop({ required: true })
  organizationName: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'URL of the organization’s logo/image',
  })
  @Prop()
  imageLink: string;

  @ApiProperty({
    example: '123 Main St, New York, NY 10001',
    description: 'Address of the organization',
  })
  @Prop({ required: true })
  address: string;

  @ApiProperty({
    type: ContactInfo,
    description: 'Primary contact person details',
  })
  @Prop({ type: ContactInfoSchema, _id: false })
  primaryContact: ContactInfo;

  @ApiProperty({
    type: ContactInfo,
    description: 'Secondary contact person details (optional)',
    required: false,
  })
  @Prop({ type: ContactInfoSchema, _id: false })
  secondaryContact?: ContactInfo;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
