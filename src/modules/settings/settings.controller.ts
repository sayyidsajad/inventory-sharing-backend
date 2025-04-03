import { Controller, Post, Get, Put, Body, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { CreateInventoryTypeDto } from './dto/create-inventory-type.dto';
import { UpdateInventoryViewDto } from './dto/update-inventory-view.dto';
import { SettingsService } from './settings.service';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post('organization')
  @ApiOperation({ summary: 'Create an organization' })
  @ApiBody({ type: CreateOrganizationDto })
  async createOrganization(@Body() data: CreateOrganizationDto) {
    return this.settingsService.createOrganization(data);
  }

  @Get('organizations')
  @ApiOperation({ summary: 'Get all organizations' })
  async getOrganizations() {
    return this.settingsService.getOrganizations();
  }

  @Put('organization/:id')
  @ApiOperation({ summary: 'Update an organization' })
  @ApiParam({ name: 'id', type: 'string', description: 'Organization ID' })
  @ApiBody({ type: UpdateOrganizationDto })
  async updateOrganization(
    @Param('id') id: string,
    @Body() data: UpdateOrganizationDto,
  ) {
    return this.settingsService.updateOrganization(id, data);
  }

  @Post('site')
  @ApiOperation({ summary: 'Create a site' })
  @ApiBody({ type: CreateSiteDto })
  async createSite(@Body() data: CreateSiteDto) {
    return this.settingsService.createSite(data);
  }

  @Get('sites')
  @ApiOperation({ summary: 'Get all sites with pagination and filters' })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Limit per page',
  })
  async getSites(@Query() queryParams: any) {
    return this.settingsService.getSites(queryParams);
  }

  @Put('site/:id')
  @ApiOperation({ summary: 'Update a site' })
  @ApiParam({ name: 'id', type: 'string', description: 'Site ID' })
  @ApiBody({ type: UpdateSiteDto })
  async updateSite(@Param('id') id: string, @Body() data: UpdateSiteDto) {
    return this.settingsService.updateSite(id, data);
  }

  @Put('inventory-view/:id')
  @ApiOperation({ summary: 'Update inventory section' })
  @ApiParam({ name: 'id', type: 'string', description: 'Inventory Section ID' })
  @ApiBody({ type: UpdateInventoryViewDto })
  async updateInventorySection(
    @Param('id') id: string,
    @Body() updateDto: UpdateInventoryViewDto,
  ) {
    return this.settingsService.updateSection(id, updateDto);
  }

  @Post('inventory-type')
  @ApiOperation({ summary: 'Create an inventory type' })
  @ApiBody({ type: CreateInventoryTypeDto })
  async createInventoryType(@Body() data: CreateInventoryTypeDto) {
    return this.settingsService.createInventoryType(data);
  }

  @Get('inventory-types')
  @ApiOperation({ summary: 'Get all inventory types' })
  async getInventoryTypes() {
    return this.settingsService.getInventoryTypes();
  }

  @Post('attribute')
  @ApiOperation({ summary: 'Create an attribute' })
  @ApiBody({ type: CreateAttributeDto })
  async createAttribute(@Body() data: CreateAttributeDto) {
    return this.settingsService.createAttribute(data);
  }

  @Get('attributes')
  @ApiOperation({ summary: 'Get paginated attributes' })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Limit per page',
  })
  async getAttributes(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.settingsService.getAttributes(
      page ? Number(page) : 1,
      limit ? Number(limit) : 50,
    );
  }
}
