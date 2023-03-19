// External dependencies
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// Internal dependencies
import env from '$src/utils/env.util';
import { Geometry } from '$src/models/Geometry.model';
import { Position } from '$src/models/Position.model';
import { Station } from '$src/models/Station.model';
import { DatabaseProvider } from './database.provider';

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'mysql',
			host: env.DATABASE_HOST,
			port: env.DATABASE_PORT,
			username: env.DATABASE_USERNAME,
			password: env.DATABASE_PASSWORD,
			database: env.DATABASE_NAME,
			synchronize: env.DATABASE_SYNCHRONIZE,
			sync: { force: true },
			autoLoadModels: true,
			models: [Geometry, Position, Station],
			logging: false
		}),
		SequelizeModule.forFeature([Geometry, Position, Station])
	],
	providers: [DatabaseProvider],
	exports: [DatabaseProvider]
})
export class DatabaseModule {}
