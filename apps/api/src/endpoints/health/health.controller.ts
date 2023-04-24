// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';
import { HttpResponse, GetHealthResponse } from '_packages/shared/types/http';
import { Endpoint } from '_packages/shared/enums';

@Controller(Endpoint.HEALTH)
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Get()
	getHealth(): Promise<HttpResponse<GetHealthResponse>> {
		return this.healthService.getHealth();
	}
}
