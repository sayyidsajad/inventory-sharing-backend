import {
  IsEnum,
  IsOptional,
  IsString,
  ArrayNotEmpty,
  ValidateIf,
} from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  attributeName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['Dropdown', 'Number', 'Date', 'SingleChoice'])
  dataType: string;

  @IsOptional()
  @ValidateIf((o) => o.dataType === 'Dropdown' || o.dataType === 'SingleChoice')
  @ArrayNotEmpty()
  values?: string[];
}
