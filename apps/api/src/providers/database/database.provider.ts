// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

// Internal dependencies
import {
	FavoriteRoute,
	FavoriteRouteCreationAttributes,
	FavoriteStation,
	FavoriteStationCreationAttributes,
	Station,
	StationCreationAttributes,
	User,
	UserCreationAttributes
} from '_packages/shared/types/models';
import { TableName } from '$src/enums/TableName.enum';

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

	public upsertStation = async (station: StationCreationAttributes): Promise<Station> => {
		const transaction = await this.sequelize.transaction();

		try {
			const queryResult = await this.sequelize.models.StationModel.create(station, {
				updateOnDuplicate: ['name'],
				transaction
			});

			if (queryResult.isNewRecord) {
				await transaction.commit();

				return queryResult.dataValues;
			}

			const existingStation = await this.sequelize.models.StationModel.findOne({
				where: { slId: station.slId },
				transaction
			});

			await transaction.commit();

			return existingStation.dataValues;
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to create station', error.stack);

			return null;
		}
	};

	public deleteStationsNotInSl = async (slIds: string[]): Promise<void> => {
		const transaction = await this.sequelize.transaction();

		try {
			await this.sequelize.query(`DELETE FROM ${TableName.STATIONS} WHERE slId NOT IN (:slIds)`, {
				replacements: { slIds },
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

	public createFavoriteRoute = async (favoriteRoute: FavoriteRouteCreationAttributes): Promise<FavoriteRoute> => {
		const transaction = await this.sequelize.transaction();

		try {
			const queryResult = await this.sequelize.models.FavoriteRouteModel.create(favoriteRoute, {
				transaction
			});

			await transaction.commit();

			return queryResult.dataValues;
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to create favorite route', error.stack);

			return null;
		}
	};

	public deleteFavoriteRoute = async (id: number): Promise<void> => {
		const transaction = await this.sequelize.transaction();

		try {
			await this.sequelize.models.FavoriteRouteModel.destroy({
				where: { id },
				transaction
			});

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to delete favorite route', error.stack);
		}
	};

	public getFavoriteStationsByAuth0Id = async (auth0Id: string): Promise<FavoriteStation[]> => {
		try {
			const queryResult = await this.sequelize.models.FavoriteStationModel.findAll({
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
						as: 'station'
					}
				]
			});

			const favoriteStations = queryResult.map((favoriteStation) => favoriteStation.dataValues);

			return favoriteStations;
		} catch (error) {
			this.logger.error('An error occurred while trying to get favorite stations', error.stack);

			return null;
		}
	};

	public createFavoriteStation = async (
		favoriteStation: FavoriteStationCreationAttributes
	): Promise<FavoriteStation> => {
		const transaction = await this.sequelize.transaction();

		try {
			const queryResult = await this.sequelize.models.FavoriteStationModel.create(favoriteStation, {
				transaction
			});

			await transaction.commit();

			return queryResult.dataValues;
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to create favorite station', error.stack);

			return null;
		}
	};

	public deleteFavoriteStation = async (id: number): Promise<void> => {
		const transaction = await this.sequelize.transaction();

		try {
			await this.sequelize.models.FavoriteStationModel.destroy({
				where: { id },
				transaction
			});

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to delete favorite station', error.stack);
		}
	};

	public upsertUser = async (user: UserCreationAttributes): Promise<User> => {
		const transaction = await this.sequelize.transaction();

		try {
			const queryResult = await this.sequelize.models.UserModel.create(user, {
				updateOnDuplicate: ['auth0Id'],
				transaction
			});

			if (queryResult.isNewRecord) {
				await transaction.commit();

				return queryResult.dataValues;
			}

			const existingUser = await this.sequelize.models.UserModel.findOne({
				where: { auth0Id: user.auth0Id },
				transaction
			});

			await transaction.commit();

			return existingUser.dataValues;
		} catch (error) {
			await transaction.rollback();

			this.logger.error('An error occurred while trying to create user', error.stack);

			return null;
		}
	};
}
