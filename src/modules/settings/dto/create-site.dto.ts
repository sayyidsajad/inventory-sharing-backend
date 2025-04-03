import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';

class GpsCoordinatesDto {
  @ApiProperty({ example: 40.7128, description: 'Latitude of the site' })
  lat: number;

  @ApiProperty({ example: -74.006, description: 'Longitude of the site' })
  lng: number;
}

class ContactInfoDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the contact person',
  })
  name: string;

  @ApiProperty({
    example: 'Site Manager',
    description: 'Title of the contact person',
  })
  title: string;

  @ApiProperty({
    example: '+1 234 567 890',
    description: 'Phone number of the contact person',
  })
  phone: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the contact person',
  })
  email: string;
}

export class CreateSiteDto {
  @ApiProperty({
    example: 'SITE123',
    description: 'Unique identifier for the site',
  })
  @IsNotEmpty()
  @IsString()
  siteId: string;

  @ApiProperty({ example: 'Fire Station 1', description: 'Name of the site' })
  @IsNotEmpty()
  @IsString()
  siteName: string;

  @ApiProperty({ example: 'Fire Department', description: 'Type of the site' })
  @IsNotEmpty()
  @IsString()
  siteType: string;

  @ApiPropertyOptional({
    example: '2023-04-01T00:00:00.000Z',
    description: 'Commissioning date of the site',
  })
  @IsOptional()
  commissionedOn: Date;

  @ApiProperty({ example: 'active', description: 'Current status of the site' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiPropertyOptional({
    example: '1234 Elm Street',
    description: 'Street address of the site',
  })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional({ example: 'New York', description: 'City of the site' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'NY', description: 'State of the site' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    example: '10001',
    description: 'ZIP code of the site',
  })
  @IsOptional()
  @IsString()
  zip?: string;

  @ApiPropertyOptional({
    type: GpsCoordinatesDto,
    description: 'GPS coordinates of the site',
  })
  @IsOptional()
  @IsObject()
  gpsCoordinates?: GpsCoordinatesDto;

  @ApiProperty({
    example: 'ORG456',
    description: 'Reference ID of the organization',
  })
  @IsNotEmpty()
  @IsString()
  organization: string;

  @ApiPropertyOptional({
    type: ContactInfoDto,
    description: 'Primary contact details for the site',
  })
  @IsOptional()
  @IsObject()
  primaryContact?: ContactInfoDto;
}
