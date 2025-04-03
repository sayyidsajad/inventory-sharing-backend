import { Injectable } from '@nestjs/common';
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
    const {
      sharedBy,
      sharedWith,
      organizationName,
      address,
      subject,
      emailBody,
      mutualSharing,
    } = data;

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

    return this.sharingModel.insertMany(requests);
  }

  async getSharedWith(userId: string) {
    return this.sharingModel
      .find({ sharedWith: userId })
      .populate('sharedBy', 'name email')
      .select(
        '_id organizationName address sharedBy createdAt status approvedBy approvedOn',
      )
      .lean()
      .exec()
      .then((records) =>
        records.map((record) => ({
          id: record._id,
          organizationName: record.organizationName,
          address: record.address,
          requestedBy: record.sharedBy,
          requestedOn: record.createdAt,
          status: record.status,
          approvedBy: record.approvedBy,
          approvedOn: record.approvedOn,
        })),
      );
  }

  async getSharedBy(userId: string) {
    return this.sharingModel
      .find({ sharedBy: userId })
      .populate('sharedWith', 'name email')
      .select(
        '_id organizationName address sharedWith createdAt status approvedBy approvedOn',
      )
      .lean()
      .exec()
      .then((records) =>
        records.map((record) => ({
          id: record._id,
          organizationName: record.organizationName,
          address: record.address,
          requestedTo: record.sharedWith,
          requestedOn: record.createdAt,
          status: record.status,
          approvedBy: record.approvedBy,
          approvedOn: record.approvedOn,
        })),
      );
  }

  async approveShare(id: string, approvedBy: string, message: string) {
    return this.sharingModel
      .findByIdAndUpdate(
        id,
        {
          status: 'approved',
          approvedBy,
          approvedOn: new Date(),
          message,
        },
        { new: true },
      )
      .populate('approvedBy', 'name email')
      .exec();
  }

  async rejectShare(id: string, message: string) {
    return this.sharingModel.findByIdAndUpdate(
      id,
      { status: 'rejected', message },
      { new: true },
    );
  }

  async getAllRequests(status?: string) {
    const filter = status ? { status } : {};
    return this.sharingModel
      .find(filter)
      .populate('sharedBy', 'name email')
      .populate('sharedWith', 'name email')
      .populate('approvedBy', 'name email')
      .lean()
      .exec();
  }
}
