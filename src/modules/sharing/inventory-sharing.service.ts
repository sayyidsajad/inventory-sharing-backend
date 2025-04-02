import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  InventorySharing,
  SharingStatus,
} from './schemas/inventory-sharing.schema';
import {
  CreateSharingRequestDto,
  UpdateSharingStatusDto,
} from './dto/create-sharing-request.dto';

@Injectable()
export class InventorySharingService {
  constructor(
    @InjectModel(InventorySharing.name)
    private sharingModel: Model<InventorySharing>,
  ) {}

  async createSharingRequest(
    dto: CreateSharingRequestDto,
  ): Promise<InventorySharing> {
    const newRequest = new this.sharingModel(dto);
    return newRequest.save();
  }

  async getSharingRequests(): Promise<InventorySharing[]> {
    return this.sharingModel.find().exec();
  }

  async updateSharingStatus(
    id: string,
    dto: UpdateSharingStatusDto,
  ): Promise<InventorySharing> {
    const sharingRequest = await this.sharingModel.findById(id);
    if (!sharingRequest)
      throw new NotFoundException('Sharing request not found');

    if (sharingRequest.status !== SharingStatus.PENDING) {
      throw new BadRequestException('Request is already processed');
    }

    sharingRequest.status = dto.status;
    return sharingRequest.save();
  }
}
