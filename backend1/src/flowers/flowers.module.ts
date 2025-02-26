import { Module } from "@nestjs/common";
import { FlowersService } from "./flowers.service";
import { FlowersController } from "./flowers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Flower } from "./entities/flower.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    TypeOrmModule.forFeature([Flower]),
    HttpModule,
    ClientsModule.register([
      {
        name: "FLOWERS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [
            "amqps://fvjurduh:OsWgX2_umUjamen5SAbISypwSMSteALe@cow.rmq2.cloudamqp.com/fvjurduh",
          ],
          queue: "flowers_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [FlowersController],
  providers: [FlowersService],
})
export class FlowersModule {}
