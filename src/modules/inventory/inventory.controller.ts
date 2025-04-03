import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new inventory item' })
  @ApiResponse({
    status: 201,
    description: 'Inventory item created successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    return await this.inventoryService.create(createInventoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all inventory items with filtering, pagination, and counts',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 50 })
  @ApiQuery({ name: 'search', required: false, example: 'fire extinguisher' })
  @ApiQuery({ name: 'categoryOperator', required: false, example: 'in' })
  @ApiQuery({
    name: 'categoryValues',
    required: false,
    example: 'electronics,furniture',
  })
  @ApiQuery({ name: 'manufacturerOperator', required: false, example: 'notIn' })
  @ApiQuery({
    name: 'manufacturerValues',
    required: false,
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiQuery({ name: 'expiryOperator', required: false, example: 'greaterThan' })
  @ApiQuery({ name: 'expiryValues', required: false, example: '2025-01-01' })
  @ApiQuery({ name: 'status', required: false, example: 'active' })
  @ApiQuery({
    name: 'organization',
    required: false,
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiQuery({
    name: 'fields',
    required: false,
    example: 'name,category,manufacturer',
  })
  @ApiResponse({
    status: 200,
    description: 'Inventory items retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 50,
    @Query('search') search?: string,
    @Query('categoryOperator') categoryOperator?: string,
    @Query('categoryValues') categoryValues?: string,
    @Query('manufacturerOperator') manufacturerOperator?: string,
    @Query('manufacturerValues') manufacturerValues?: string,
    @Query('expiryOperator') expiryOperator?: string,
    @Query('expiryValues') expiryValues?: string,
    @Query('status') status?: string,
    @Query('organization') organization?: string,
    @Query('fields') fields?: string,
  ) {
    return await this.inventoryService.findAll({
      page,
      limit,
      search,
      categoryOperator,
      categoryValues,
      manufacturerOperator,
      manufacturerValues,
      expiryOperator,
      expiryValues,
      status,
      organization,
      fields,
    });
  }
}
