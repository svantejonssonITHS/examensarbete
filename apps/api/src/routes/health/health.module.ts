// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';
import { HealthController } from './health.controller';

@Module({
	controllers: [HealthController],
	providers: [HealthService]
})
export class HealthModule {}
