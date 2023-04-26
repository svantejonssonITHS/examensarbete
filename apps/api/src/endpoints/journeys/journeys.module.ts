// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { JourneysService } from './journeys.service';
import { JourneysController } from './journeys.controller';
import { SLModule } from '$src/providers/sl/sl.module';

@Module({
	imports: [SLModule],
	controllers: [JourneysController],
	providers: [JourneysService]
})
export class JourneysModule {}
