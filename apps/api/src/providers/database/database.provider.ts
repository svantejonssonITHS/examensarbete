// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

// Internal dependencies
import { GeometryAttributes, GeometryCreationAttributes } from '$src/models/Geometry.model';
import { PositionAttributes, PositionCreationAttributes } from '$src/models/Position.model';
import { StationAttributes, StationCreationAttributes } from '$src/models/Station.model';

@Injectable()
export class DatabaseProvider {
	constructor(private sequelize: Sequelize) {}

	private readonly logger = new Logger(DatabaseProvider.name);

	public checkConnection = async (): Promise<boolean> => {
		try {
			await this.sequelize.authenticate();

			this.logger.log('New database connection was successful, database appears healthy');

			return true;
		} catch (error) {
			this.logger.error('Unable to connect to the database, database appears unhealthy', error.stack);

			return false;
		}
	};

	public upsertGeometry = async (geometry: GeometryCreationAttributes): Promise<GeometryAttributes> => {
		const transaction = await this.sequelize.transaction();

		try {
			const queryResult = await this.sequelize.models.Geometry.create(geometry, {
				updateOnDuplicate: ['positionId', 'stationId'],
				transaction
			});

			await transaction.commit();

			return queryResult.dataValues;
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to create geometry', error.stack);

			return null;
		}
	};

	public upsertPosition = async (position: PositionCreationAttributes): Promise<PositionAttributes> => {
		const transaction = await this.sequelize.transaction();

		try {
			const queryResult = await this.sequelize.models.Position.create(position, {
				updateOnDuplicate: ['vasttrafikId'],
				transaction
			});

			await transaction.commit();

			return queryResult.dataValues;
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to create position', error.stack);

			return null;
		}
	};

	public upsertStation = async (station: StationCreationAttributes): Promise<StationAttributes> => {
		const transaction = await this.sequelize.transaction();

		try {
			const queryResult = await this.sequelize.models.Station.create(station, {
				updateOnDuplicate: ['vasttrafikId'],
				transaction
			});

			await transaction.commit();

			return queryResult.dataValues;
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to create station', error.stack);

			return null;
		}
	};
}
