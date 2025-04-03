import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './schemas/inventory.schema';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import {
  Manufacturer,
  ManufacturerSchema,
} from './schemas/manufacturer.schema';
import { Supplier, SupplierSchema } from './schemas/supplier.schema';
import { Location, LocationSchema } from './schemas/location.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
      { name: Location.name, schema: LocationSchema },
      { name: Manufacturer.name, schema: ManufacturerSchema },
      { name: Supplier.name, schema: SupplierSchema },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
