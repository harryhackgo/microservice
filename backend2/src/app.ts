import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
    }
  );

  await app.listen();
}
bootstrap();
