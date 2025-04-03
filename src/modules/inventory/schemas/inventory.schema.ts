import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Inventory extends Document {
  @ApiProperty({
    description: 'Unique equipment ID',
    example: 'EQP-12345',
  })
  @Prop({ required: true, unique: true })
  equipId: string;

  @ApiProperty({
    description: 'Name of the inventory item',
    example: 'Fire Hose',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Description of the item',
    example: 'High-pressure fire hose for emergency use',
    required: false,
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'Manufacturer ID (Reference to Manufacturer model)',
    example: '65a7c3d2b6a41a1d78e0e512',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Manufacturer',
    required: true,
  })
  manufacturer: string;

  @ApiProperty({
    description: 'SKU or MPN (Manufacturer Part Number)',
    example: 'MPN-987654',
    required: false,
  })
  @Prop()
  skuMpn: string;

  @ApiProperty({
    description: 'Model number of the item',
    example: 'Model-X120',
    required: false,
  })
  @Prop()
  modelNumber: string;

  @ApiProperty({
    description: 'Serial number of the equipment',
    example: 'SN-20230456789',
    required: false,
  })
  @Prop()
  serialNumber: string;

  @ApiProperty({
    description: 'Type of the inventory item',
    example: 'Firefighting Equipment',
  })
  @Prop({ required: true })
  type: string;

  @ApiProperty({
    description: 'Category of the inventory item',
    example: 'Hoses',
  })
  @Prop({ required: true })
  category: string;

  @ApiProperty({
    description: 'Sensor 1 identifier',
    example: 'Temp Sensor A',
    required: false,
  })
  @Prop()
  sensor1: string;

  @ApiProperty({
    description: 'Sensor 2 identifier',
    example: 'Pressure Sensor B',
    required: false,
  })
  @Prop()
  sensor2: string;

  @ApiProperty({
    description: 'Sensor 3 identifier',
    example: 'Flow Sensor C',
    required: false,
  })
  @Prop()
  sensor3: string;

  @ApiProperty({
    description: 'Sensor 4 identifier',
    example: 'Smoke Sensor D',
    required: false,
  })
  @Prop()
  sensor4: string;

  @ApiProperty({
    description: 'Purchase price of the item',
    example: 250.75,
    required: false,
  })
  @Prop()
  purchasePrice: number;

  @ApiProperty({
    description: 'Date of acquisition',
    example: '2023-10-15T00:00:00.000Z',
    required: false,
  })
  @Prop()
  acquisitionDate: Date;

  @ApiProperty({
    description: 'Insurance coverage details',
    example: 'Covered under XYZ Insurance until 2026',
    required: false,
  })
  @Prop()
  insuranceCoverage: string;

  @ApiProperty({
    description: 'Warranty expiry date',
    example: '2026-12-31T00:00:00.000Z',
    required: false,
  })
  @Prop()
  warrantyExpiryDate: Date;

  @ApiProperty({
    description: 'Supplier ID (Reference to Supplier model)',
    example: '65a7c3d2b6a41a1d78e0e789',
    required: false,
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  supplier: string;

  @ApiProperty({
    description: 'Purchase order reference',
    example: 'PO-56789',
    required: false,
  })
  @Prop()
  purchaseOrder: string;

  @ApiProperty({
    description: 'Location ID (Reference to Location model)',
    example: '65a7c3d2b6a41a1d78e0f123',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Location',
    required: true,
  })
  location: string;

  @ApiProperty({
    description: 'Room or fire truck location',
    example: 'Fire Truck B2',
    required: false,
  })
  @Prop()
  roomFireTruck: string;

  @ApiProperty({
    description: 'Aisle in the storage location',
    example: 'Aisle 4',
    required: false,
  })
  @Prop()
  aisle: string;

  @ApiProperty({
    description: 'Rack number in storage',
    example: 'Rack C6',
    required: false,
  })
  @Prop()
  rack: string;

  @ApiProperty({
    description: 'Shelf level in the rack',
    example: 'Level 2',
    required: false,
  })
  @Prop()
  shelfLevel: string;

  @ApiProperty({
    description: 'Bin identifier in storage',
    example: 'Bin 9A',
    required: false,
  })
  @Prop()
  bin: string;

  @ApiProperty({
    description: 'Unique tag ID',
    example: 'TAG-456XYZ',
    required: false,
  })
  @Prop({ unique: true })
  tagId: string;

  @ApiProperty({
    description: 'Current status of the inventory',
    example: 'Available',
    enum: ['Available', 'Out of Stock', 'Under Maintenance'],
  })
  @Prop({
    required: true,
    enum: ['Available', 'Out of Stock', 'Under Maintenance'],
  })
  status: string;

  @ApiProperty({
    description: 'Start date for depreciation calculations',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
  })
  @Prop()
  depreciationStartDate: Date;

  @ApiProperty({
    description: 'Depreciation method used',
    example: 'Straight-Line',
    required: false,
  })
  @Prop()
  depreciationMethod: string;

  @ApiProperty({
    description: 'Depreciation rate percentage',
    example: 10,
    required: false,
  })
  @Prop()
  depreciationRate: number;

  @ApiProperty({
    description: 'Current value of the inventory',
    example: 180.5,
    required: false,
  })
  @Prop()
  currentValue: number;

  @ApiProperty({
    description: 'Value at disposal',
    example: 50,
    required: false,
  })
  @Prop()
  valueAtDisposal: number;

  @ApiProperty({
    description: 'Date of commissioning',
    example: '2023-06-15T00:00:00.000Z',
    required: false,
  })
  @Prop()
  commissionedDate: Date;

  @ApiProperty({
    description: 'Maintenance schedule',
    example: 'Quarterly',
    required: false,
  })
  @Prop()
  schedule: string;

  @ApiProperty({
    description: 'Last maintenance date',
    example: '2024-02-01T00:00:00.000Z',
    required: false,
  })
  @Prop()
  lastMaintenanceDate: Date;

  @ApiProperty({
    description: 'Next scheduled maintenance date',
    example: '2024-05-01T00:00:00.000Z',
    required: false,
  })
  @Prop()
  nextMaintenanceDate: Date;

  @ApiProperty({
    description: 'List of associated document URLs',
    example: ['https://example.com/doc1.pdf', 'https://example.com/doc2.pdf'],
    required: false,
  })
  @Prop({ type: [String] })
  documents: string[];

  @ApiProperty({
    description: 'List of associated inventory item IDs',
    example: ['65a7c3d2b6a41a1d78e0f456', '65a7c3d2b6a41a1d78e0f789'],
    required: false,
  })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Inventory' }] })
  associatedItems: string[];
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
