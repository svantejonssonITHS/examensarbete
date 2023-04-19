// External dependencies
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Internal dependencies
import {
	HttpResponse,
	GetFavoriteRoutesRequest,
	GetFavoriteRoutesResponse,
	PostFavoriteRoutesRequest,
	PostFavoriteRoutesResponse,
	DeleteFavoriteRoutesRequest
} from '_packages/shared/types/http';
import { DatabaseProvider } from '$src/providers/database/database.provider';

@Injectable()
export class FavoriteRoutesService {
	constructor(private databaseProvider: DatabaseProvider) {}

	private readonly logger = new Logger(FavoriteRoutesService.name);

	async getFavoriteRoutes(queries: GetFavoriteRoutesRequest): Promise<HttpResponse<GetFavoriteRoutesResponse>> {
		try {
			const favoriteRoutes = await this.databaseProvider.getFavoriteRoutesByAuth0Id(queries.auth0Id);

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

	async createFavoriteRoute(body: PostFavoriteRoutesRequest): Promise<HttpResponse<PostFavoriteRoutesResponse>> {
		try {
			const user = await this.databaseProvider.upsertUser({ auth0Id: body.auth0Id });

			if (!user?.id) throw new InternalServerErrorException();

			const favoriteRoute = await this.databaseProvider.createFavoriteRoute({
				userId: user.id,
				originStationId: body.originStationId,
				destinationStationId: body.destinationStationId
			});

			if (!favoriteRoute) throw new InternalServerErrorException();

			return {
				success: true,
				message: 'Successfully created favorite route',
				favoriteRoute: favoriteRoute
			};
		} catch (error) {
			this.logger.error(error.message);

			throw new InternalServerErrorException({
				success: false,
				message: 'An error occurred while trying to create favorite route'
			});
		}
	}

	async deleteFavoriteRoute(queries: DeleteFavoriteRoutesRequest): Promise<HttpResponse> {
		try {
			await this.databaseProvider.deleteFavoriteRoute(queries.id);

			return {
				success: true,
				message: 'Successfully deleted favorite route'
			};
		} catch (error) {
			this.logger.error(error.message);

			throw new InternalServerErrorException({
				success: false,
				message: 'An error occurred while trying to delete favorite route'
			});
		}
	}
}
