import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsObject } from 'class-validator';

class ContactInfoDto {
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Name of the contact person',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Manager',
    description: 'Title or designation of the contact person',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: '+1 234 567 890',
    description: 'Phone number of the contact person',
  })
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'Email address of the contact person',
  })
  @IsString()
  email: string;
}

export class UpdateOrganizationDto {
  @ApiPropertyOptional({
    example: 'Tech Solutions Inc.',
    description: 'Updated name of the organization',
  })
  @IsOptional()
  @IsString()
  organizationName?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
    description: 'Updated logo URL of the organization',
  })
  @IsOptional()
  @IsString()
  imageLink?: string;

  @ApiPropertyOptional({
    example: '123 Main St, City, Country',
    description: 'Updated address of the organization',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    type: ContactInfoDto,
    description: 'Updated primary contact information',
  })
  @IsOptional()
  @IsObject()
  primaryContact?: ContactInfoDto;

  @ApiPropertyOptional({
    type: ContactInfoDto,
    description: 'Updated secondary contact information',
  })
  @IsOptional()
  @IsObject()
  secondaryContact?: ContactInfoDto;
}
