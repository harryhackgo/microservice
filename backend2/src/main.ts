import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
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
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        "amqps://fvjurduh:OsWgX2_umUjamen5SAbISypwSMSteALe@cow.rmq2.cloudamqp.com/fvjurduh",
      ],
      queue: "customers_queue",
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3001, () => {
    console.log(
      `Backed2 has started working on port ${process.env.PORT ?? 3001}`
    );
  });
}
bootstrap();
