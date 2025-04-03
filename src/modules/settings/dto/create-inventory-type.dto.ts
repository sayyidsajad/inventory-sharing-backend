import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';

class AttributeWithMandatory {
  @ApiProperty({
    example: '60d0fe4f5311236168a109cc',
    description: 'The ID of the attribute',
  })
  @IsString()
  attribute: string;

  @ApiProperty({
    example: 'yes',
    description: 'Indicates whether the attribute is mandatory',
    enum: ['yes', 'no'],
  })
  @IsEnum(['yes', 'no'])
  isMandatory: string;
}

export class CreateInventoryTypeDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the inventory type',
  })
  @IsString()
  itemTypeName: string;

  @ApiPropertyOptional({
    example: 'Category for electronic items',
    description: 'A brief description of the inventory type',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: [AttributeWithMandatory],
    description:
      'List of attributes associated with the inventory type, specifying if they are mandatory',
    example: [
      { attribute: '60d0fe4f5311236168a109cc', isMandatory: 'yes' },
      { attribute: '60d0fe4f5311236168a109cd', isMandatory: 'no' },
    ],
  })
  @IsOptional()
  @IsArray()
  attributes?: AttributeWithMandatory[];
}
