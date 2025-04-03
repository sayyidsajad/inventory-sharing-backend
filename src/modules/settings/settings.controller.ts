import { Controller, Post, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { SettingsService } from './settings.service';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post('organization')
  @ApiOperation({ summary: 'Create an organization' })
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
  async updateOrganization(
    @Param('id') id: string,
    @Body() data: UpdateOrganizationDto,
  ) {
    return this.settingsService.updateOrganization(id, data);
  }

  @Post('site')
  @ApiOperation({ summary: 'Create a site' })
  async createSite(@Body() data: CreateSiteDto) {
    return this.settingsService.createSite(data);
  }

  @Get('sites')
  @ApiOperation({ summary: 'Get all sites with pagination and filters' })
  async getSites(@Query() queryParams: any) {
    return this.settingsService.getSites(queryParams);
  }

  @Put('site/:id')
  @ApiOperation({ summary: 'Update a site' })
  async updateSite(@Param('id') id: string, @Body() data: UpdateSiteDto) {
    return this.settingsService.updateSite(id, data);
  }

  @Post('attribute')
  @ApiOperation({ summary: 'Create an attribute' })
  async createAttribute(@Body() data: CreateAttributeDto) {
    return this.settingsService.createAttribute(data);
  }

  @Get('attributes')
  @ApiOperation({ summary: 'Get paginated attributes' })
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
