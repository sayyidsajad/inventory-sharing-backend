import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from './schemas/organization.schema';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { CreateSiteDto } from './dto/create-site.dto';
import { Site } from './schemas/site.schema';
import { UpdateSiteDto } from './dto/update-site.dto';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { Attribute, AttributeDocument } from './schemas/attribute.schema';
import { CreateInventoryTypeDto } from './dto/create-inventory-type.dto';
import { InventoryType } from './schemas/inventory-type.schema';
import { InventoryView } from './schemas/inventory-view.schema';
import { UpdateInventoryViewDto } from './dto/update-inventory-view.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<Organization>,
    @InjectModel(Site.name) private siteModel: Model<Site>,
    @InjectModel(Attribute.name)
    private attributeModel: Model<AttributeDocument>,
    @InjectModel(InventoryType.name)
    private inventoryTypeModel: Model<InventoryType>,
    @InjectModel(InventoryView.name)
    private inventoryViewModel: Model<InventoryView>,
  ) {}

  async createOrganization(data: CreateOrganizationDto) {
    try {
      return await new this.organizationModel(data).save();
    } catch {
      throw new InternalServerErrorException('Failed to create organization');
    }
  }

  async getOrganizations() {
    try {
      return await this.organizationModel.find().exec();
    } catch {
      throw new InternalServerErrorException('Failed to fetch organizations');
    }
  }

  async updateOrganization(id: string, data: UpdateOrganizationDto) {
    const organization = await this.organizationModel.findById(id).exec();
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    try {
      return await this.organizationModel
        .findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
        })
        .exec();
    } catch {
      throw new InternalServerErrorException('Failed to update organization');
    }
  }

  async createSite(data: CreateSiteDto) {
    try {
      return await new this.siteModel(data).save();
    } catch {
      throw new InternalServerErrorException('Failed to create site');
    }
  }

  async getSites(queryParams: any) {
    const { page = 1, itemsPerPage = 50, ...filters } = queryParams;
    const query: any = {};

    for (const key in filters) {
      if (filters[key]) {
        query[key] = { $regex: filters[key], $options: 'i' };
      }
    }

    try {
      const sites = await this.siteModel
        .find(query)
        .populate('organization')
        .limit(Number(itemsPerPage))
        .skip((Number(page) - 1) * Number(itemsPerPage))
        .exec();

      const total = await this.siteModel.countDocuments(query).exec();

      return {
        total,
        page: Number(page),
        itemsPerPage: Number(itemsPerPage),
        data: sites,
      };
    } catch {
      throw new InternalServerErrorException('Failed to fetch sites');
    }
  }

  async updateSite(id: string, data: UpdateSiteDto) {
    const site = await this.siteModel.findById(id).exec();
    if (!site) {
      throw new NotFoundException('Site not found');
    }

    try {
      return await this.siteModel
        .findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
        })
        .exec();
    } catch {
      throw new InternalServerErrorException('Failed to update site');
    }
  }

  async updateSection(
    sectionId: string,
    updateDto: UpdateInventoryViewDto,
  ): Promise<InventoryView | null> {
    const systemSections = ['General', 'Type and Category'];

    const existingSection = await this.inventoryViewModel
      .findById(sectionId)
      .lean();
    if (!existingSection) throw new NotFoundException('Section not found');

    if (systemSections.includes(existingSection.sectionName)) {
      throw new BadRequestException(
        `"${existingSection.sectionName}" cannot be modified`,
      );
    }

    try {
      const updatedSection = await this.inventoryViewModel
        .findByIdAndUpdate(
          sectionId,
          { $set: updateDto },
          { new: true, runValidators: true },
        )
        .exec();

      if (!updatedSection) {
        throw new NotFoundException('Inventory view section not found');
      }

      return updatedSection;
    } catch {
      throw new InternalServerErrorException(
        'Failed to update inventory section',
      );
    }
  }

  async createInventoryType(
    data: CreateInventoryTypeDto,
  ): Promise<InventoryType> {
    try {
      const newInventoryType = new this.inventoryTypeModel(data);
      return await newInventoryType.save();
    } catch {
      throw new InternalServerErrorException('Failed to create inventory type');
    }
  }

  async getInventoryTypes(): Promise<InventoryType[]> {
    try {
      return await this.inventoryTypeModel
        .find()
        .populate('attributes', 'attributeName description dataType')
        .exec();
    } catch {
      throw new InternalServerErrorException('Failed to fetch inventory types');
    }
  }

  async createAttribute(data: CreateAttributeDto): Promise<Attribute> {
    try {
      return await this.attributeModel.create(data);
    } catch {
      throw new InternalServerErrorException('Failed to create attribute');
    }
  }

  async getAttributes(page = 1, limit = 50): Promise<Partial<Attribute>[]> {
    const skip = (page - 1) * limit;

    try {
      return await this.attributeModel
        .find()
        .skip(skip)
        .limit(limit)
        .select('attributeName description dataType')
        .exec();
    } catch {
      throw new InternalServerErrorException('Failed to fetch attributes');
    }
  }
}
