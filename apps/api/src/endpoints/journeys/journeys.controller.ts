// External dependencies
import { Controller, Get, Query } from '@nestjs/common';

// Internal dependencies
import { JourneysService } from './journeys.service';
import { GetJourneysRequest, GetJourneysResponse, HttpResponse } from '_packages/shared/types/http';
import { Endpoint } from '_packages/shared/enums';

@Controller(Endpoint.JOURNEYS)
export class JourneysController {
	constructor(private readonly journeysService: JourneysService) {}

	@Get()
	getJourneys(@Query() queries: GetJourneysRequest): Promise<HttpResponse<GetJourneysResponse>> {
		return this.journeysService.getJourneys(queries);
	}
}
