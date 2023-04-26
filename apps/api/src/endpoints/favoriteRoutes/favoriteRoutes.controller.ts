// External dependencies
import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';

// Internal dependencies
import { FavoriteRoutesService } from './favoriteRoutes.service';
import {
	HttpResponse,
	GetFavoriteRoutesResponse,
	PostFavoriteRoutesResponse,
	PostFavoriteRoutesRequest,
	DeleteFavoriteRoutesRequest
} from '_packages/shared/types/http';
import { AuthGuard } from '$src/guards/auth.guard';
import { Endpoint } from '_packages/shared/enums';

@Controller(Endpoint.FAVORITE_ROUTES)
@UseGuards(AuthGuard)
export class FavoriteRoutesController {
	constructor(private readonly favoriteRoutesService: FavoriteRoutesService) {}

	@Get()
	getFavoriteRoutes(@Request() req): Promise<HttpResponse<GetFavoriteRoutesResponse>> {
		return this.favoriteRoutesService.getFavoriteRoutes({ auth0Id: req.user.sub });
	}

	@Post()
	createFavoriteRoute(
		@Request() req,
		@Body() body: PostFavoriteRoutesRequest
	): Promise<HttpResponse<PostFavoriteRoutesResponse>> {
		return this.favoriteRoutesService.createFavoriteRoute({ auth0Id: req.user.sub, ...body });
	}

	@Delete()
	deleteFavoriteRoute(@Request() req, @Query() queries: DeleteFavoriteRoutesRequest): Promise<HttpResponse> {
		return this.favoriteRoutesService.deleteFavoriteRoute({ auth0Id: req.user.sub, ...queries });
	}
}
