import { IsOptional, IsString, IsObject } from 'class-validator';

class ContactInfoDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;
}

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  organizationName?: string;

  @IsOptional()
  @IsString()
  imageLink?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsObject()
  primaryContact?: ContactInfoDto;

  @IsOptional()
  @IsObject()
  secondaryContact?: ContactInfoDto;
}
