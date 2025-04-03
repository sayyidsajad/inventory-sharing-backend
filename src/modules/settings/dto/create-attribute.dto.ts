import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  ArrayNotEmpty,
  ValidateIf,
} from 'class-validator';

export class CreateAttributeDto {
  @ApiProperty({
    example: 'Color',
    description: 'The name of the attribute',
  })
  @IsString()
  attributeName: string;

  @ApiPropertyOptional({
    example: 'Defines available colors for the item',
    description: 'A brief description of the attribute',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'Dropdown',
    description: 'The data type of the attribute',
    enum: ['Dropdown', 'Number', 'Date', 'SingleChoice'],
  })
  @IsEnum(['Dropdown', 'Number', 'Date', 'SingleChoice'])
  dataType: string;

  @ApiPropertyOptional({
    example: ['Red', 'Blue', 'Green'],
    description:
      'Allowed values for attributes with Dropdown or SingleChoice data types',
  })
  @IsOptional()
  @ValidateIf((o) => o.dataType === 'Dropdown' || o.dataType === 'SingleChoice')
  @ArrayNotEmpty()
  values?: string[];
}
