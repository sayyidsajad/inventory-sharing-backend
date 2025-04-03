import { Controller, Post, Get, Body, Param, Put, Query } from '@nestjs/common';
import { InventorySharingService } from './inventory-sharing.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Inventory Sharing')
@Controller('inventory-sharing')
export class InventorySharingController {
  constructor(private readonly sharingService: InventorySharingService) {}

  @Post()
  @ApiOperation({ summary: 'Request inventory sharing' })
  async requestShare(@Body() data) {
    return this.sharingService.requestShare(data);
  }

  @Put(':id/approve')
  @ApiOperation({ summary: 'Approve a sharing request' })
  async approveShare(
    @Param('id') id: string,
    @Body('approvedBy') approvedBy: string,
    @Body('message') message: string,
  ) {
    return this.sharingService.approveShare(id, approvedBy, message);
  }

  @Put(':id/reject')
  @ApiOperation({ summary: 'Reject a sharing request' })
  async rejectShare(@Param('id') id: string, @Body('message') message: string) {
    return this.sharingService.rejectShare(id, message);
  }

  @Get('shared-with/:userId')
  async getSharedWith(@Param('userId') userId: string) {
    return this.sharingService.getSharedWith(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sharing requests with filters' })
  async getAllSharingRequests(@Query('status') status?: string) {
    return this.sharingService.getAllRequests(status);
  }

  @Get('shared-by/:userId')
  @ApiOperation({ summary: 'Get inventory shared by a user' })
  async getSharedBy(@Param('userId') userId: string) {
    return this.sharingService.getSharedBy(userId);
  }
}
