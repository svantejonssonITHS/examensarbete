// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { StationsService } from './stations.service';
import { StationsResponse } from '_packages/shared/types';

@Controller('Stations')
export class StationsController {
	constructor(private readonly StationsService: StationsService) {}

	@Get()
	getStations(): Promise<StationsResponse> {
		return this.StationsService.getStations();
	}
}
