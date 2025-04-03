import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from './schemas/inventory.schema';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    try {
      const newInventory = new this.inventoryModel(createInventoryDto);
      return await newInventory.save();
    } catch {
      throw new InternalServerErrorException('Failed to create inventory item');
    }
  }

  async findAll({
    page = 1,
    limit = 50,
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
  }) {
    try {
      const query: any = {};

      if (search) query['name'] = new RegExp(search, 'i');
      if (status) query['status'] = status;
      if (organization) query['organization'] = organization;

      if (categoryOperator && categoryValues) {
        const categories = categoryValues.split(',');
        query['category'] =
          categoryOperator === 'in'
            ? { $in: categories }
            : { $nin: categories };
      }

      if (manufacturerOperator && manufacturerValues) {
        const manufacturers = manufacturerValues.split(',');
        query['manufacturer'] =
          manufacturerOperator === 'in'
            ? { $in: manufacturers }
            : { $nin: manufacturers };
      }

      if (expiryOperator && expiryValues) {
        const expiryField = 'expiryDate';
        switch (expiryOperator) {
          case 'greaterThan':
            query[expiryField] = { $gt: new Date(expiryValues) };
            break;
          case 'lessThan':
            query[expiryField] = { $lt: new Date(expiryValues) };
            break;
          case 'between': {
            const [start, end] = expiryValues.split(',');
            query[expiryField] = { $gte: new Date(start), $lte: new Date(end) };
            break;
          }
          case 'notIn':
            query[expiryField] = {
              $nin: expiryValues.split(',').map((d) => new Date(d)),
            };
            break;
        }
      }

      const selectedFields = fields ? fields.split(',').join(' ') : '';

      const data = await this.inventoryModel
        .find(query)
        .select(selectedFields)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      const totalEquipmentCount = await this.inventoryModel
        .countDocuments()
        .exec();
      const expiredCount = await this.inventoryModel
        .countDocuments({ expiryDate: { $lt: new Date() } })
        .exec();

      const thirtyDaysLater = new Date();
      thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
      const expiringSoonCount = await this.inventoryModel
        .countDocuments({
          expiryDate: { $gte: new Date(), $lte: thirtyDaysLater },
        })
        .exec();

      return {
        totalEquipmentCount,
        expiredCount,
        expiringSoonCount,
        total: data.length,
        data,
      };
    } catch {
      throw new InternalServerErrorException('Failed to fetch inventory data');
    }
  }
}
