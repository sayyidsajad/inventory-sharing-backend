import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './config/database.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { InventorySharingModule } from './modules/inventory-sharing/inventory-sharing.module';

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
  ],
})
export class AppModule {}
