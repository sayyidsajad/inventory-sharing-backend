import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InventorySharing,
  InventorySharingSchema,
} from './schemas/inventory-sharing.schema';
import { InventorySharingController } from './inventory-sharing.controller';
import { InventorySharingService } from './inventory-sharing.service';

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
