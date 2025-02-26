import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { Customer } from "./entities/customer.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
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
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
