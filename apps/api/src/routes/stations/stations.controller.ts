// External dependencies
import { Controller, Get, Query } from '@nestjs/common';

// Internal dependencies
import { StationsService } from './stations.service';
import { StationsResponse } from '_packages/shared/types';

@Controller('stations')
export class StationsController {
	constructor(private readonly stationsService: StationsService) {}

	@Get()
	getStations(@Query('name') name: string): Promise<StationsResponse> {
		return this.stationsService.getStations(name);
	}
}
