import { IsString, IsInt, Min } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsString()
  location: string;
}
