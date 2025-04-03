import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import {
  Organization,
  OrganizationSchema,
} from './schemas/organization.schema';
import { Site, SiteSchema } from './schemas/site.schema';
import { Attribute, AttributeSchema } from './schemas/attribute.schema';
import {
  InventoryType,
  InventoryTypeSchema,
} from './schemas/inventory-type.schema';
import {
  InventoryView,
  InventoryViewSchema,
} from './schemas/inventory-view.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: Site.name, schema: SiteSchema },
      { name: Attribute.name, schema: AttributeSchema },
      { name: InventoryType.name, schema: InventoryTypeSchema },
      { name: InventoryView.name, schema: InventoryViewSchema },
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
