// External dependencies
import { Controller, Get, Query } from '@nestjs/common';

// Internal dependencies
import { StationsService } from './stations.service';
import { HttpResponse, GetStationsRequest, GetStationsResponse } from '_packages/shared/types/http';
import { Endpoint } from '_packages/shared/enums';

@Controller(Endpoint.STATIONS)
export class StationsController {
	constructor(private readonly stationsService: StationsService) {}

	@Get()
	getStations(@Query() queries: GetStationsRequest): Promise<HttpResponse<GetStationsResponse>> {
		return this.stationsService.getStations(queries);
	}
}
