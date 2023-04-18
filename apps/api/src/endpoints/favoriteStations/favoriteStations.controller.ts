// External dependencies
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

// Internal dependencies
import { FavoriteStationsService } from './favoriteStations.service';
import { HttpResponse, GetFavoriteStationsResponse } from '_packages/shared/types/http';
import { AuthGuard } from '$src/guards/auth.guard';

@Controller('favorite-stations')
@UseGuards(AuthGuard)
export class FavoriteStationsController {
	constructor(private readonly favoriteStationsService: FavoriteStationsService) {}

	@Get()
	getStations(@Request() req): Promise<HttpResponse<GetFavoriteStationsResponse>> {
		return this.favoriteStationsService.getFavoriteStations({ auth0Id: req.user.sub });
	}
}
