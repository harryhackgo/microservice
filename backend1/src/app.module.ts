import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FlowersModule } from "./flowers/flowers.module";
import { ShopsModule } from "./shops/shop.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModule } from "./customer/customer.module";
import { Flower } from "./flowers/entities/flower.entity";
import { Shop } from "./shops/entities/shop.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "B!$m1llah",
      database: "microservice",
      entities: [Flower, Shop],
      synchronize: true,
    }),
    FlowersModule,
    ShopsModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
