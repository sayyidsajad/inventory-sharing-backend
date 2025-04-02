import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventorySharingService } from './inventory-sharing.service';
import { InventorySharingController } from './inventory-sharing.controller';
import {
  InventorySharing,
  InventorySharingSchema,
} from './schemas/inventory-sharing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InventorySharing.name, schema: InventorySharingSchema },
    ]),
  ],
  controllers: [InventorySharingController],
  providers: [InventorySharingService],
})
export class InventorySharingModule {}
