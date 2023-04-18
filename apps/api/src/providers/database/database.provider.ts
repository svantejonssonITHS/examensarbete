// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

// Internal dependencies
import {
	FavoriteRoute,
	Geometry,
	GeometryCreationAttributes,
	Position,
	PositionCreationAttributes,
	Station,
	StationCreationAttributes
} from '_packages/shared/types/models';
import { TableName } from '$src/enums/tableName.enum';

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

	public upsertGeometry = async (geometry: GeometryCreationAttributes): Promise<Geometry> => {
		const transaction = await this.sequelize.transaction();

		try {
			const queryResult = await this.sequelize.models.GeometryModel.create(geometry, {
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

	public upsertPosition = async (position: PositionCreationAttributes): Promise<Position> => {
		const transaction = await this.sequelize.transaction();

		try {
			const queryResult = await this.sequelize.models.PositionModel.create(position, {
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
			await this.sequelize.query(
				`DELETE FROM ${TableName.POSITIONS} WHERE vasttrafikId NOT IN (:vasttrafikIds)`,
				{
					replacements: { vasttrafikIds },
					transaction
				}
			);

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to delete position(s)', error.stack);
		}
	};

	public upsertStation = async (station: StationCreationAttributes): Promise<Station> => {
		const transaction = await this.sequelize.transaction();

		try {
			const queryResult = await this.sequelize.models.StationModel.create(station, {
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
			await this.sequelize.query(`DELETE FROM ${TableName.STATIONS} WHERE vasttrafikId NOT IN (:vasttrafikIds)`, {
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
	public getStationsByName = async (name: string): Promise<Station[]> => {
		try {
			const queryResult = await this.sequelize.models.StationModel.findAll({
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

	public getFavoriteRoutesByAuth0Id = async (auth0Id: string): Promise<FavoriteRoute[]> => {
		try {
			const queryResult = await this.sequelize.models.FavoriteRouteModel.findAll({
				attributes: ['id'],
				include: [
					{
						model: this.sequelize.models.UserModel,
						as: 'user',
						where: {
							auth0Id
						}
					},
					{
						model: this.sequelize.models.StationModel,
						as: 'originStation'
					},
					{
						model: this.sequelize.models.StationModel,
						as: 'destinationStation'
					}
				]
			});

			const favoriteRoutes = queryResult.map((favoriteRoute) => favoriteRoute.dataValues);

			return favoriteRoutes;
		} catch (error) {
			this.logger.error('An error occurred while trying to get favorite routes', error.stack);

			return null;
		}
	};
}
