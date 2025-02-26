import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FlowersModule } from "./flowers/flowers.module";
import { CustomerModule } from "./customer/customer.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ShopsModule } from "./shops/shops.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/microservice"),
    FlowersModule,
    CustomerModule,
    ShopsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
