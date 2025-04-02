import { IsString, IsEnum } from 'class-validator';
import { SharingStatus } from '../schemas/inventory-sharing.schema';

export class CreateSharingRequestDto {
  @IsString()
  inventoryId: string;

  @IsString()
  sharedBy: string;

  @IsString()
  sharedWith: string;
}

export class UpdateSharingStatusDto {
  @IsEnum(SharingStatus)
  status: SharingStatus;
}
