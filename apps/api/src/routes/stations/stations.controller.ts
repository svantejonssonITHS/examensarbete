// External dependencies
import { Controller, Get, Query } from '@nestjs/common';

// Internal dependencies
import { StationsService } from './stations.service';
import { HttpResponse, StationsResponse } from '_packages/shared/types/http';

@Controller('stations')
export class StationsController {
	constructor(private readonly stationsService: StationsService) {}

	@Get()
	getStations(@Query('name') name: string): Promise<HttpResponse<StationsResponse>> {
		return this.stationsService.getStations(name);
	}
}
