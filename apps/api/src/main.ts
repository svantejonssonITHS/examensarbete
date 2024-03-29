// External dependencies
import { NestFactory } from '@nestjs/core';

// Internal dependencies
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	await app.listen(3000);
}
bootstrap();
