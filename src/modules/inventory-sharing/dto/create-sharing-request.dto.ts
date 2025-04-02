import { IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventorySharingDto {
  @ApiProperty({ example: 'supplier123', description: 'ID of the supplier' })
  @IsString()
  supplierId: string;

  @ApiProperty({ example: 'buyer456', description: 'ID of the buyer' })
  @IsString()
  buyerId: string;

  @ApiProperty({
    example: 'item789',
    description: 'ID of the item being shared',
  })
  @IsString()
  itemId: string;

  @ApiProperty({
    example: 100,
    description: 'Quantity of the item being shared',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 20.5, description: 'Price per unit of the item' })
  @IsNumber()
  pricePerUnit: number;

  @ApiProperty({
    example: 'pending',
    enum: ['pending', 'accepted', 'rejected'],
    description: 'Sharing status',
  })
  @IsEnum(['pending', 'accepted', 'rejected'])
  status: string;
}
