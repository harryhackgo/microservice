import { Module } from "@nestjs/common";
import { ShopsService } from "./shops.service";
import { ShopsController } from "./shops.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Shop, ShopSchema } from "./schemas/shop.schema";
import { ShopsMicroserviceController } from "./shops.microservice.controller";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    HttpModule,
  ],
  controllers: [ShopsController, ShopsMicroserviceController],
  providers: [ShopsService],
})
export class ShopsModule {}
