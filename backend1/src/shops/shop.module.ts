import { Module } from "@nestjs/common";
import { ShopsService } from "./shop.service";
import { ShopsController } from "./shop.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shop } from "./entities/shop.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop]),
    HttpModule,
    ClientsModule.register([
      {
        name: "FLOWERS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [
            "amqps://fvjurduh:OsWgX2_umUjamen5SAbISypwSMSteALe@cow.rmq2.cloudamqp.com/fvjurduh",
          ],
          queue: "shops_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
