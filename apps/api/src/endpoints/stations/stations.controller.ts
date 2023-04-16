// External dependencies
import { Controller, Get, Query } from '@nestjs/common';

// Internal dependencies
import { StationsService } from './stations.service';
import { HttpResponse, StationsRequest, StationsResponse } from '_packages/shared/types/http';

@Controller('stations')
export class StationsController {
	constructor(private readonly stationsService: StationsService) {}

	@Get()
	getStations(@Query() queries: StationsRequest): Promise<HttpResponse<StationsResponse>> {
		return this.stationsService.getStations(queries);
	}
}
