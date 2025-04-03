import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventorySharing } from './schemas/inventory-sharing.schema';

@Injectable()
export class InventorySharingService {
  constructor(
    @InjectModel(InventorySharing.name)
    private sharingModel: Model<InventorySharing>,
  ) {}

  async requestShare(data) {
    try {
      const {
        sharedBy,
        sharedWith,
        organizationName,
        address,
        subject,
        emailBody,
        mutualSharing,
      } = data;

      if (!sharedBy || !sharedWith?.length) {
        throw new BadRequestException(
          'Invalid data: sharedBy and sharedWith are required.',
        );
      }

      const requests = sharedWith.map((userId) => ({
        sharedBy,
        sharedWith: userId,
        organizationName,
        address,
        subject,
        emailBody,
        mutualSharing,
        status: 'pending',
      }));

      return await this.sharingModel.insertMany(requests);
    } catch {
      throw new InternalServerErrorException(
        'Failed to create sharing requests.',
      );
    }
  }

  async getSharedWith(userId: string) {
    try {
      if (!userId) throw new BadRequestException('User ID is required.');

      const records = await this.sharingModel
        .find({ sharedWith: userId })
        .populate('sharedBy', 'name email')
        .select(
          '_id organizationName address sharedBy createdAt status approvedBy approvedOn',
        )
        .lean()
        .exec();

      return records.map((record) => ({
        id: record._id,
        organizationName: record.organizationName,
        address: record.address,
        requestedBy: record.sharedBy,
        requestedOn: record.createdAt,
        status: record.status,
        approvedBy: record.approvedBy,
        approvedOn: record.approvedOn,
      }));
    } catch {
      throw new InternalServerErrorException(
        'Failed to retrieve shared inventories.',
      );
    }
  }

  async getSharedBy(userId: string) {
    try {
      if (!userId) throw new BadRequestException('User ID is required.');

      const records = await this.sharingModel
        .find({ sharedBy: userId })
        .populate('sharedWith', 'name email')
        .select(
          '_id organizationName address sharedWith createdAt status approvedBy approvedOn',
        )
        .lean()
        .exec();

      return records.map((record) => ({
        id: record._id,
        organizationName: record.organizationName,
        address: record.address,
        requestedTo: record.sharedWith,
        requestedOn: record.createdAt,
        status: record.status,
        approvedBy: record.approvedBy,
        approvedOn: record.approvedOn,
      }));
    } catch {
      throw new InternalServerErrorException(
        'Failed to retrieve shared inventories.',
      );
    }
  }

  async approveShare(id: string, approvedBy: string, message?: string) {
    try {
      if (!id || !approvedBy) {
        throw new BadRequestException(
          'Invalid request: id and approvedBy are required.',
        );
      }

      const updatedRequest = await this.sharingModel
        .findByIdAndUpdate(
          id,
          { status: 'approved', approvedBy, approvedOn: new Date(), message },
          { new: true },
        )
        .populate('approvedBy', 'name email')
        .exec();

      if (!updatedRequest)
        throw new NotFoundException('Sharing request not found.');

      return updatedRequest;
    } catch {
      throw new InternalServerErrorException(
        'Failed to approve sharing request.',
      );
    }
  }

  async rejectShare(id: string, message: string) {
    try {
      if (!id) throw new BadRequestException('Request ID is required.');

      const updatedRequest = await this.sharingModel.findByIdAndUpdate(
        id,
        { status: 'rejected', message },
        { new: true },
      );

      if (!updatedRequest)
        throw new NotFoundException('Sharing request not found.');

      return updatedRequest;
    } catch {
      throw new InternalServerErrorException(
        'Failed to reject sharing request.',
      );
    }
  }

  async getAllRequests(status?: string) {
    try {
      const filter = status ? { status } : {};

      const requests = await this.sharingModel
        .find(filter)
        .populate('sharedBy', 'name email')
        .populate('sharedWith', 'name email')
        .populate('approvedBy', 'name email')
        .lean()
        .exec();

      return requests;
    } catch {
      throw new InternalServerErrorException(
        'Failed to retrieve sharing requests.',
      );
    }
  }
}
