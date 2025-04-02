import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { InventorySharingService } from './inventory-sharing.service';
import {
  CreateSharingRequestDto,
  UpdateSharingStatusDto,
} from './dto/create-sharing-request.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Inventory Sharing')
@Controller('inventory-sharing')
export class InventorySharingController {
  constructor(private readonly sharingService: InventorySharingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a sharing request' })
  async createSharingRequest(@Body() dto: CreateSharingRequestDto) {
    return this.sharingService.createSharingRequest(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sharing requests' })
  async getSharingRequests() {
    return this.sharingService.getSharingRequests();
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update sharing request status (approve/reject)' })
  async updateSharingStatus(
    @Param('id') id: string,
    @Body() dto: UpdateSharingStatusDto,
  ) {
    return this.sharingService.updateSharingStatus(id, dto);
  }
}
