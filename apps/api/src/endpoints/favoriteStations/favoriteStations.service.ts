// External dependencies
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Internal dependencies
import {
	HttpResponse,
	GetFavoriteStationsRequest,
	GetFavoriteStationsResponse,
	PostFavoriteStationsRequest,
	PostFavoriteStationsResponse,
	DeleteFavoriteStationsRequest
} from '_packages/shared/types/http';
import { DatabaseProvider } from '$src/providers/database/database.provider';

@Injectable()
export class FavoriteStationsService {
	constructor(private databaseProvider: DatabaseProvider) {}

	private readonly logger = new Logger(FavoriteStationsService.name);

	async getFavoriteStations(queries: GetFavoriteStationsRequest): Promise<HttpResponse<GetFavoriteStationsResponse>> {
		try {
			const favoriteStations = await this.databaseProvider.getFavoriteStationsByAuth0Id(queries.auth0Id);

			if (!favoriteStations) throw new InternalServerErrorException();

			return {
				success: true,
				message: 'Successfully fetched stations',
				favoriteStations: favoriteStations
			};
		} catch (error) {
			this.logger.error(error.message);

			throw new InternalServerErrorException({
				success: false,
				message: 'An error occurred while trying to get stations'
			});
		}
	}

	async createFavoriteStation(
		body: PostFavoriteStationsRequest
	): Promise<HttpResponse<PostFavoriteStationsResponse>> {
		try {
			const user = await this.databaseProvider.upsertUser({ auth0Id: body.auth0Id });

			if (!user?.id) throw new InternalServerErrorException();

			const favoriteStation = await this.databaseProvider.createFavoriteStation({
				userId: user.id,
				stationId: body.stationId
			});

			if (!favoriteStation) throw new InternalServerErrorException();

			return {
				success: true,
				message: 'Successfully created favorite station',
				favoriteStation: favoriteStation
			};
		} catch (error) {
			this.logger.error(error.message);

			throw new InternalServerErrorException({
				success: false,
				message: 'An error occurred while trying to create favorite station'
			});
		}
	}

	async deleteFavoriteStation(queries: DeleteFavoriteStationsRequest): Promise<HttpResponse> {
		try {
			await this.databaseProvider.deleteFavoriteStation(queries.id);

			return {
				success: true,
				message: 'Successfully deleted favorite station'
			};
		} catch (error) {
			this.logger.error(error.message);

			throw new InternalServerErrorException({
				success: false,
				message: 'An error occurred while trying to delete favorite station'
			});
		}
	}
}
