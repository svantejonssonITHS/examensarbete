// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

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
				updateOnDuplicate: ['longitude', 'latitude', 'positionId', 'stationId'],
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
				updateOnDuplicate: ['name', 'shortName', 'abbreviation', 'designation', 'stationId'],
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

	public deletePositionsNotInVasttrafik = async (vasttrafikIds: string[]): Promise<void> => {
		const transaction = await this.sequelize.transaction();

		try {
			await this.sequelize.query(`DELETE FROM positions WHERE vasttrafikId NOT IN (:vasttrafikIds)`, {
				replacements: { vasttrafikIds },
				transaction
			});

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to delete position(s)', error.stack);
		}
	};

	public upsertStation = async (station: StationCreationAttributes): Promise<StationAttributes> => {
		const transaction = await this.sequelize.transaction();

		try {
			const queryResult = await this.sequelize.models.Station.create(station, {
				updateOnDuplicate: ['name', 'shortName', 'abbreviation'],
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

	public deleteStationsNotInVasttrafik = async (vasttrafikIds: string[]): Promise<void> => {
		const transaction = await this.sequelize.transaction();

		try {
			await this.sequelize.query(`DELETE FROM stations WHERE vasttrafikId NOT IN (:vasttrafikIds)`, {
				replacements: { vasttrafikIds },
				transaction
			});

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to delete station(s)', error.stack);
		}
	};

	// TODO: Add pagination, option to include relations
	/**
	 * @description Limited to 5 results
	 */
	public getStationsByName = async (name: string): Promise<StationAttributes[]> => {
		try {
			const queryResult = await this.sequelize.models.Station.findAll({
				attributes: ['id', 'name', 'shortName', 'abbreviation'],
				where: {
					name: {
						[Op.like]: '%' + name + '%'
					}
				},
				limit: 5
			});

			const stations = queryResult.map((station) => station.dataValues);

			return stations;
		} catch (error) {
			this.logger.error('An error occurred while trying to get stations', error.stack);

			return null;
		}
	};
}
