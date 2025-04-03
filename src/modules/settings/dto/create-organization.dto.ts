import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

class ContactInfoDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the contact person',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Manager',
    description: 'Job title of the contact person',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '+1 234 567 890',
    description: 'Phone number of the contact person',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the contact person',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CreateOrganizationDto {
  @ApiProperty({
    example: 'Tech Solutions Inc.',
    description: 'The name of the organization',
  })
  @IsNotEmpty()
  @IsString()
  organizationName: string;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
    description: 'URL of the organization’s logo',
  })
  @IsOptional()
  @IsString()
  imageLink?: string;

  @ApiProperty({
    example: '1234 Elm Street, New York, NY 10001',
    description: 'The complete address of the organization',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    type: ContactInfoDTO,
    description: 'Primary contact details for the organization',
  })
  @IsNotEmpty()
  primaryContact: ContactInfoDTO;

  @ApiPropertyOptional({
    type: ContactInfoDTO,
    description:
      'Secondary contact details for the organization (if available)',
  })
  @IsOptional()
  secondaryContact?: ContactInfoDTO;
}
