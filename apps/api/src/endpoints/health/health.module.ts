// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { SlModule } from '$src/providers/sl/sl.module';
import { DatabaseModule } from '$src/providers/database/database.module';

@Module({
	imports: [SlModule, DatabaseModule],
	controllers: [HealthController],
	providers: [HealthService]
})
export class HealthModule {}
