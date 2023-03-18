// External dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal dependencies
import env from '$src/utils/env.util';
import { Geometry, Position, Station } from '$src/entities';
import { DatabaseProvider } from './database.provider';

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
			autoLoadEntities: true
		}),
		TypeOrmModule.forFeature([Geometry, Position, Station])
	],
	providers: [DatabaseProvider],
	exports: [DatabaseProvider]
})
export class DatabaseModule {}
