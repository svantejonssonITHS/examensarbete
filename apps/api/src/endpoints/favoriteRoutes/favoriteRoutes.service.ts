// External dependencies
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Internal dependencies
import { HttpResponse, GetFavoriteRoutesRequest, GetFavoriteRoutesResponse } from '_packages/shared/types/http';
import { DatabaseProvider } from '$src/providers/database/database.provider';

@Injectable()
export class FavoriteRoutesService {
	constructor(private databaseProvider: DatabaseProvider) {}

	private readonly logger = new Logger(FavoriteRoutesService.name);

	async getFavoriteRoutes(queries: GetFavoriteRoutesRequest): Promise<HttpResponse<GetFavoriteRoutesResponse>> {
		try {
			const favoriteRoutes = await this.databaseProvider.getFavoriteRoutesByAuth0Id(queries.auth0Id);

			console.log(queries.auth0Id);

			if (!favoriteRoutes) throw new InternalServerErrorException();

			return {
				success: true,
				message: 'Successfully fetched stations',
				favoriteRoutes: favoriteRoutes
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
