// External dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal dependencies
import env from './utils/env.util';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Geometry, Position, Station } from './entities';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: env.DATABASE_HOST,
			port: env.DATABASE_PORT,
			username: env.DATABASE_USERNAME,
			password: env.DATABASE_PASSWORD,
			database: env.DATABASE_NAME,
			synchronize: env.DATABASE_SYNCHRONIZE,
			entities: [Geometry, Position, Station]
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
