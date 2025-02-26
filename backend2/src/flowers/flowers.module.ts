import { Module } from "@nestjs/common";
import { FlowersService } from "./flowers.service";
import { FlowersController } from "./flowers.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Flower, FlowerSchema } from "./schemas/flower.schema";
import { FlowersMicroserviceController } from "./flowers.microservice.controller";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flower.name, schema: FlowerSchema }]),
    HttpModule,
  ],
  controllers: [FlowersController, FlowersMicroserviceController],
  providers: [FlowersService],
})
export class FlowersModule {}
