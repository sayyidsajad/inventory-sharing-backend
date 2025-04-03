import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

class ContactInfoDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  organizationName: string;

  @IsOptional()
  @IsString()
  imageLink?: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  primaryContact: ContactInfoDTO;

  @IsOptional()
  secondaryContact?: ContactInfoDTO;
}
