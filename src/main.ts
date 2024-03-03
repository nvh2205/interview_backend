import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { ValidationPipe422 } from "./validators/validation-pipe-tranform.validate";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );

  const configService = app.get(ConfigService);
  const port = String(configService.get("PORT") ?? 3000);

  const config = new DocumentBuilder()
    .setTitle("API")
    .setVersion("1.0")
    .addBearerAuth()
    .addServer(
      `http://localhost:${port}/main/${configService.get("apiPrefix")}`,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.useGlobalPipes(new ValidationPipe422({ whitelist: true }));
  app.setGlobalPrefix(`main/${configService.get("apiPrefix")}`);

  await app.listen(port, "0.0.0.0");

  console.log(`APP IS RUNNING ON PORT ${await app.getUrl()}`);
}

void bootstrap();
