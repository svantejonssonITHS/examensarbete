// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';
import { HttpResponse, HealthResponse } from '_packages/shared/types/http';

@Controller('health')
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Get()
	getHealth(): Promise<HttpResponse<HealthResponse>> {
		return this.healthService.getHealth();
	}
}
