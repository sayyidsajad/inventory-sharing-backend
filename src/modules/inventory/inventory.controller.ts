import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create new inventory item' })
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all inventory items with filtering, pagination, and counts',
  })
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
    return this.inventoryService.findAll({
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
