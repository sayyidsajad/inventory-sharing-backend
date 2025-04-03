import { Injectable } from '@nestjs/common';
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

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<Organization>,
    @InjectModel(Site.name) private siteModel: Model<Site>,
    @InjectModel(Attribute.name)
    private attributeModel: Model<AttributeDocument>,
  ) {}

  async createOrganization(data: CreateOrganizationDto) {
    return await new this.organizationModel(data).save();
  }

  async getOrganizations() {
    return await this.organizationModel.find();
  }

  async updateOrganization(id: string, data: UpdateOrganizationDto) {
    const updatedOrg = await this.organizationModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      },
    );

    return updatedOrg;
  }

  async createSite(data: CreateSiteDto) {
    return await new this.siteModel(data).save();
  }

  async getSites(queryParams: any) {
    const { page = 1, itemsPerPage = 50, ...filters } = queryParams;

    const query = {};
    for (const key in filters) {
      if (filters[key]) {
        query[key] = { $regex: filters[key], $options: 'i' };
      }
    }

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
  }

  async updateSite(id: string, data: UpdateSiteDto) {
    const updatedSite = await this.siteModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return updatedSite;
  }

  async createAttribute(data: CreateAttributeDto): Promise<Attribute> {
    return this.attributeModel.create(data);
  }

  async getAttributes(page = 1, limit = 50): Promise<Partial<Attribute>[]> {
    const skip = (page - 1) * limit;

    return this.attributeModel
      .find()
      .skip(skip)
      .limit(limit)
      .select('attributeName description dataType')
      .exec();
  }
}
