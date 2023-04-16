// External dependencies
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// Internal dependencies
import env from '$src/utils/env.util';
import { FavoriteRouteModel } from '$src/models/FavoriteRoute.model';
import { FavoriteStationModel } from '$src/models/FavoriteStation.model';
import { GeometryModel } from '$src/models/Geometry.model';
import { PositionModel } from '$src/models/Position.model';
import { StationModel } from '$src/models/Station.model';
import { UserModel } from '$src/models/User.model';
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
			models: [FavoriteRouteModel, FavoriteStationModel, GeometryModel, PositionModel, StationModel, UserModel],
			logging: false
		}),
		SequelizeModule.forFeature([
			FavoriteRouteModel,
			FavoriteStationModel,
			GeometryModel,
			PositionModel,
			StationModel,
			UserModel
		])
	],
	providers: [DatabaseProvider],
	exports: [DatabaseProvider]
})
export class DatabaseModule {}
