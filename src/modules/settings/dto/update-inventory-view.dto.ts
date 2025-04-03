import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
  IsArray,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateFieldDto {
  @ApiProperty({ example: 'Item Name', description: 'Name of the field' })
  @IsString()
  fieldName: string;

  @ApiProperty({ example: true, description: 'Whether the field is selected' })
  @IsBoolean()
  isSelected: boolean;

  @ApiProperty({ example: false, description: 'Whether the field is disabled' })
  @IsBoolean()
  isDisabled: boolean;
}

export class UpdateInventoryViewDto {
  @ApiProperty({ example: 'General Info', description: 'Name of the section' })
  @IsString()
  sectionName: string;

  @ApiProperty({ example: 2, description: 'Order of the section' })
  @IsNumber()
  @Min(1)
  order: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Indicates if the section can be reordered',
  })
  @IsBoolean()
  @IsOptional()
  isReorderable?: boolean;

  @ApiProperty({
    type: [UpdateFieldDto],
    description: 'List of fields in the inventory section',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFieldDto)
  fields: UpdateFieldDto[];
}
