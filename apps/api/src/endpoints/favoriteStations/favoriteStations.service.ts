// External dependencies
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Internal dependencies
import { HttpResponse, GetFavoriteStationsRequest, GetFavoriteStationsResponse } from '_packages/shared/types/http';
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
}
