// External dependencies
import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';

// Internal dependencies
import { FavoriteStationsService } from './favoriteStations.service';
import {
	HttpResponse,
	GetFavoriteStationsResponse,
	PostFavoriteStationsRequest,
	PostFavoriteStationsResponse,
	DeleteFavoriteStationsRequest
} from '_packages/shared/types/http';
import { AuthGuard } from '$src/guards/auth.guard';
import { Endpoint } from '_packages/shared/enums';

@Controller(Endpoint.FAVORITE_STATIONS)
@UseGuards(AuthGuard)
export class FavoriteStationsController {
	constructor(private readonly favoriteStationsService: FavoriteStationsService) {}

	@Get()
	getStations(@Request() req): Promise<HttpResponse<GetFavoriteStationsResponse>> {
		return this.favoriteStationsService.getFavoriteStations({ auth0Id: req.user.sub });
	}

	@Post()
	createFavoriteStation(
		@Request() req,
		@Body() body: PostFavoriteStationsRequest
	): Promise<HttpResponse<PostFavoriteStationsResponse>> {
		return this.favoriteStationsService.createFavoriteStation({ auth0Id: req.user.sub, ...body });
	}

	@Delete()
	deleteFavoriteStation(@Request() req, @Query() queries: DeleteFavoriteStationsRequest): Promise<HttpResponse> {
		return this.favoriteStationsService.deleteFavoriteStation({ auth0Id: req.user.sub, ...queries });
	}
}
