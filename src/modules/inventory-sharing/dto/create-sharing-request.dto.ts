import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class RequestShareDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'ID of the user sharing inventory',
  })
  @IsString()
  @IsNotEmpty()
  sharedBy: string;

  @ApiProperty({
    example: ['60d0fe4f5311236168a109cb'],
    description: 'IDs of users receiving inventory',
    isArray: true,
  })
  @IsArray()
  @IsNotEmpty()
  sharedWith: string[];

  @ApiProperty({ example: 'Fire Department', description: 'Organization Name' })
  @IsString()
  @IsOptional()
  organizationName?: string;

  @ApiProperty({
    example: '123 Main St, City, Country',
    description: 'Address',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: 'Inventory Sharing Request',
    description: 'Subject of the sharing request',
  })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({
    example: 'Please review the shared inventory details.',
    description: 'Email body content',
  })
  @IsString()
  @IsOptional()
  emailBody?: string;

  @ApiProperty({ example: true, description: 'Is mutual sharing allowed?' })
  @IsBoolean()
  @IsOptional()
  mutualSharing?: boolean;
}

export class ApproveShareDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109cd',
    description: 'ID of the user approving the request',
  })
  @IsString()
  @IsNotEmpty()
  approvedBy: string;

  @ApiProperty({
    example: 'Request approved successfully.',
    description: 'Approval message',
  })
  @IsString()
  @IsOptional()
  message?: string;
}

export class RejectShareDto {
  @ApiProperty({
    example: 'Request rejected due to policy.',
    description: 'Rejection reason',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
