import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './config/database.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { InventorySharingModule } from './modules/inventory-sharing/inventory-sharing.module';
import { UserModule } from './modules/user/user.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    InventoryModule,
    InventorySharingModule,
    UserModule,
    SettingsModule,
  ],
})
export class AppModule {}
