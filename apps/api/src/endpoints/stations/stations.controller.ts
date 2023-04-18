// External dependencies
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

// Internal dependencies
import { StationsService } from './stations.service';
import { HttpResponse, GetStationsRequest, GetStationsResponse } from '_packages/shared/types/http';
import { AuthGuard } from '$src/guards/auth.guard';

@Controller('stations')
@UseGuards(AuthGuard)
export class StationsController {
	constructor(private readonly stationsService: StationsService) {}

	@Get()
	getStations(@Query() queries: GetStationsRequest): Promise<HttpResponse<GetStationsResponse>> {
		return this.stationsService.getStations(queries);
	}
}
