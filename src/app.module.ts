import { Module, OnApplicationShutdown, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { InventorySharingModule } from './modules/inventory-sharing/inventory-sharing.module';
import { UserModule } from './modules/user/user.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    InventoryModule,
    InventorySharingModule,
    UserModule,
    SettingsModule,
  ],
})
export class AppModule implements OnModuleDestroy, OnApplicationShutdown {
  onModuleDestroy() {
    console.log('Cleaning up before module is destroyed...');
  }

  onApplicationShutdown() {
    console.log('Application is shutting down...');
  }
}
