// External dependencies
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

// Internal dependencies
import { FavoriteRoutesService } from './favoriteRoutes.service';
import {
	HttpResponse,
	GetFavoriteRoutesResponse,
	PostFavoriteRoutesResponse,
	PostFavoriteRoutesRequest
} from '_packages/shared/types/http';
import { AuthGuard } from '$src/guards/auth.guard';

@Controller('favorite-routes')
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
}
