import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateSiteDto {
  @IsNotEmpty()
  @IsString()
  siteId: string;

  @IsNotEmpty()
  @IsString()
  siteName: string;

  @IsNotEmpty()
  @IsString()
  siteType: string;

  @IsOptional()
  commissionedOn: Date;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  street?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  zip?: string;

  @IsOptional()
  @IsObject()
  gpsCoordinates?: {
    lat: number;
    lng: number;
  };

  @IsNotEmpty()
  @IsString()
  organization: string;

  @IsOptional()
  @IsObject()
  primaryContact?: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };
}
