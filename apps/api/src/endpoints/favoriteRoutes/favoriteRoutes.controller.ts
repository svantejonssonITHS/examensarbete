// External dependencies
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

// Internal dependencies
import { FavoriteRoutesService } from './favoriteRoutes.service';
import { HttpResponse, GetFavoriteRoutesResponse } from '_packages/shared/types/http';
import { AuthGuard } from '$src/guards/auth.guard';

@Controller('favorite-routes')
@UseGuards(AuthGuard)
export class FavoriteRoutesController {
	constructor(private readonly favoriteRoutesService: FavoriteRoutesService) {}

	@Get()
	getStations(@Request() req): Promise<HttpResponse<GetFavoriteRoutesResponse>> {
		return this.favoriteRoutesService.getFavoriteRoutes({ auth0Id: req.user.sub });
	}
}
