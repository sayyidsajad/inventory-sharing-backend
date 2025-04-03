import { Controller, Post, Get, Body, Param, Put, Query } from '@nestjs/common';
import { InventorySharingService } from './inventory-sharing.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  ApproveShareDto,
  RejectShareDto,
  RequestShareDto,
} from './dto/create-sharing-request.dto';

@ApiTags('Inventory Sharing')
@Controller('inventory-sharing')
export class InventorySharingController {
  constructor(private readonly sharingService: InventorySharingService) {}

  @Post()
  @ApiOperation({ summary: 'Request inventory sharing' })
  @ApiResponse({
    status: 201,
    description: 'Sharing request created successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sharedBy: { type: 'string', example: '60d0fe4f5311236168a109ca' },
        sharedWith: {
          type: 'array',
          items: { type: 'string' },
          example: ['60d0fe4f5311236168a109cb'],
        },
        organizationName: { type: 'string', example: 'Fire Department' },
        address: { type: 'string', example: '123 Main St, City, Country' },
        subject: { type: 'string', example: 'Inventory Sharing Request' },
        emailBody: {
          type: 'string',
          example: 'Please review the shared inventory details.',
        },
        mutualSharing: { type: 'boolean', example: true },
      },
      required: ['sharedBy', 'sharedWith'],
    },
  })
  async requestShare(@Body() data: RequestShareDto) {
    return this.sharingService.requestShare(data);
  }

  @Put(':id/approve')
  @ApiOperation({ summary: 'Approve a sharing request' })
  @ApiResponse({ status: 200, description: 'Sharing request approved' })
  @ApiResponse({ status: 400, description: 'Invalid request ID' })
  @ApiParam({ name: 'id', required: true, example: '60d0fe4f5311236168a109cc' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        approvedBy: { type: 'string', example: '60d0fe4f5311236168a109cd' },
        message: { type: 'string', example: 'Request approved successfully.' },
      },
      required: ['approvedBy'],
    },
  })
  async approveShare(@Param('id') id: string, @Body() body: ApproveShareDto) {
    return this.sharingService.approveShare(id, body.approvedBy, body.message);
  }

  @Put(':id/reject')
  @ApiOperation({ summary: 'Reject a sharing request' })
  @ApiResponse({ status: 200, description: 'Sharing request rejected' })
  @ApiResponse({ status: 400, description: 'Invalid request ID' })
  @ApiParam({ name: 'id', required: true, example: '60d0fe4f5311236168a109cc' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Request rejected due to policy.' },
      },
      required: ['message'],
    },
  })
  async rejectShare(@Param('id') id: string, @Body() body: RejectShareDto) {
    return this.sharingService.rejectShare(id, body.message);
  }

  @Get('shared-with/:userId')
  @ApiOperation({ summary: 'Get inventory shared with a user' })
  @ApiResponse({
    status: 200,
    description: 'List of inventories shared with the user',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    example: '60d0fe4f5311236168a109ca',
  })
  async getSharedWith(@Param('userId') userId: string) {
    return this.sharingService.getSharedWith(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sharing requests with filters' })
  @ApiResponse({ status: 200, description: 'List of sharing requests' })
  @ApiQuery({
    name: 'status',
    required: false,
    example: 'pending',
    description: 'Filter by request status',
  })
  async getAllSharingRequests(@Query('status') status?: string) {
    return this.sharingService.getAllRequests(status);
  }

  @Get('shared-by/:userId')
  @ApiOperation({ summary: 'Get inventory shared by a user' })
  @ApiResponse({
    status: 200,
    description: 'List of inventories shared by the user',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    example: '60d0fe4f5311236168a109cb',
  })
  async getSharedBy(@Param('userId') userId: string) {
    return this.sharingService.getSharedBy(userId);
  }
}
