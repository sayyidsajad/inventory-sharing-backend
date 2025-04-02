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
    return new this.sharingModel(data).save();
  }

  async approveShare(id: string) {
    return this.sharingModel
      .findByIdAndUpdate(id, { status: 'approved' }, { new: true })
      .exec();
  }

  async getSharedWith(userId: string) {
    return this.sharingModel.find({ sharedWith: userId }).exec();
  }

  async getSharedBy(userId: string) {
    return this.sharingModel.find({ sharedBy: userId }).exec();
  }

  async rejectShare(id: string) {
    return this.sharingModel.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true },
    );
  }
  async getAllRequests(status?: string) {
    const filter = status ? { status } : {};
    return this.sharingModel.find(filter).exec();
  }
}
