import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  IsArray,
  IsMongoId,
  IsDateString,
} from 'class-validator';

enum InventoryStatus {
  AVAILABLE = 'Available',
  OUT_OF_STOCK = 'Out of Stock',
  UNDER_MAINTENANCE = 'Under Maintenance',
}

export class CreateInventoryDto {
  @ApiProperty({ example: 'EQUIP123', description: 'Unique Equipment ID' })
  @IsString()
  @IsNotEmpty()
  equipId: string;

  @ApiProperty({
    example: 'Fire Extinguisher',
    description: 'Name of the equipment',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ABC Dry Powder Fire Extinguisher', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'Manufacturer ID',
  })
  @IsMongoId()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({ example: 'SKU-12345', required: false })
  @IsString()
  @IsOptional()
  skuMpn?: string;

  @ApiProperty({ example: 'Model-X', required: false })
  @IsString()
  @IsOptional()
  modelNumber?: string;

  @ApiProperty({ example: 'SN-98765', required: false })
  @IsString()
  @IsOptional()
  serialNumber?: string;

  @ApiProperty({ example: 'Safety Equipment' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'Fire Safety' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Sensor-1', required: false })
  @IsString()
  @IsOptional()
  sensor1?: string;

  @ApiProperty({
    example: 1000,
    required: false,
    description: 'Purchase price in USD',
  })
  @IsNumber()
  @IsOptional()
  purchasePrice?: number;

  @ApiProperty({ example: '2023-10-15T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  acquisitionDate?: string;

  @ApiProperty({ example: 'Covered by XYZ Insurance', required: false })
  @IsString()
  @IsOptional()
  insuranceCoverage?: string;

  @ApiProperty({ example: '2026-10-15T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  warrantyExpiryDate?: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109cb', required: false })
  @IsMongoId()
  @IsOptional()
  supplier?: string;

  @ApiProperty({ example: 'PO-45678', required: false })
  @IsString()
  @IsOptional()
  purchaseOrder?: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cc',
    description: 'Location ID',
  })
  @IsMongoId()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'Fire Truck A1', required: false })
  @IsString()
  @IsOptional()
  roomFireTruck?: string;

  @ApiProperty({ example: 'Rack-5', required: false })
  @IsString()
  @IsOptional()
  rack?: string;

  @ApiProperty({ example: 'TAG-98765', required: false })
  @IsString()
  @IsOptional()
  tagId?: string;

  @ApiProperty({ example: 'Available', enum: InventoryStatus })
  @IsEnum(InventoryStatus)
  @IsNotEmpty()
  status: InventoryStatus;

  @ApiProperty({ example: '2024-10-01T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  depreciationStartDate?: string;

  @ApiProperty({ example: 'Straight Line', required: false })
  @IsString()
  @IsOptional()
  depreciationMethod?: string;

  @ApiProperty({
    example: 10,
    required: false,
    description: 'Depreciation rate in percentage',
  })
  @IsNumber()
  @IsOptional()
  depreciationRate?: number;

  @ApiProperty({
    example: 800,
    required: false,
    description: 'Current estimated value',
  })
  @IsNumber()
  @IsOptional()
  currentValue?: number;

  @ApiProperty({ example: ['doc1.pdf', 'manual.pdf'], required: false })
  @IsArray()
  @IsOptional()
  documents?: string[];

  @ApiProperty({
    example: ['60d0fe4f5311236168a109cd', '60d0fe4f5311236168a109ce'],
    required: false,
    description: 'Associated inventory items',
  })
  @IsArray()
  @IsOptional()
  associatedItems?: string[];
}
