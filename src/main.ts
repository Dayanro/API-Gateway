import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const adapterHost = app.get(HttpAdapterHost);
  const httpAdapter = adapterHost.httpAdapter;
  const instance = httpAdapter.getInstance();
  app.useGlobalFilters(new AllExceptionsFilter(instance));
  await app.listen(3000);
}
bootstrap();
