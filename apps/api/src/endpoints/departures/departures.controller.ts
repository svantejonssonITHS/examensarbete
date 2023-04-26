// External dependencies
import { Controller, Get, Query } from '@nestjs/common';

// Internal dependencies
import { DeparturesService } from './departures.service';
import { GetDeparturesRequest, GetDeparturesResponse, HttpResponse } from '_packages/shared/types/http';
import { Endpoint } from '_packages/shared/enums';

@Controller(Endpoint.DEPARTURES)
export class DeparturesController {
	constructor(private readonly departuresService: DeparturesService) {}

	@Get()
	getDepartures(@Query() queries: GetDeparturesRequest): Promise<HttpResponse<GetDeparturesResponse>> {
		return this.departuresService.getDepartures(queries);
	}
}
