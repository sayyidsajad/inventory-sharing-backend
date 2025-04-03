import { Injectable } from '@nestjs/common';
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
    const newInventory = new this.inventoryModel(createInventoryDto);
    return newInventory.save();
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
    const query = {};

    // Search filter
    if (search) query['name'] = new RegExp(search, 'i');

    // Status & Organization filters
    if (status) query['status'] = status;
    if (organization) query['organization'] = organization;

    // Category Filtering (in, not in)
    if (categoryOperator && categoryValues) {
      const categories = categoryValues.split(',');
      if (categoryOperator === 'in') {
        query['category'] = { $in: categories };
      } else if (categoryOperator === 'notIn') {
        query['category'] = { $nin: categories };
      }
    }

    // Manufacturer Filtering (in, not in)
    if (manufacturerOperator && manufacturerValues) {
      const manufacturers = manufacturerValues.split(',');
      if (manufacturerOperator === 'in') {
        query['manufacturer'] = { $in: manufacturers };
      } else if (manufacturerOperator === 'notIn') {
        query['manufacturer'] = { $nin: manufacturers };
      }
    }

    // Expiry Date Filtering
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

    const orderedData = data.map((item) => {
      const reorderedItem = {};
      if (fields) {
        const fieldOrder = fields.split(',');
        fieldOrder.forEach((field) => {
          if (item[field] !== undefined) {
            reorderedItem[field] = item[field];
          }
        });
      } else {
        Object.assign(reorderedItem, item.toObject());
      }
      return reorderedItem;
    });

    // Counts
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
      total: orderedData.length,
      data: orderedData,
    };
  }
}
