// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';
import { HealthResponse } from '_packages/shared/types';

@Controller('health')
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Get()
	getHealth(): Promise<HealthResponse> {
		return this.healthService.getHealth();
	}
}
