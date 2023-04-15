// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';
import { HTTPResponse, HealthResponse } from '_packages/shared/types';

@Controller('health')
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Get()
	getHealth(): Promise<HTTPResponse<HealthResponse>> {
		return this.healthService.getHealth();
	}
}
