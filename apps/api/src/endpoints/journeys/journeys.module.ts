// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { JourneysService } from './journeys.service';
import { JourneysController } from './journeys.controller';
import { SlModule } from '$src/providers/sl/sl.module';

@Module({
	imports: [SlModule],
	controllers: [JourneysController],
	providers: [JourneysService]
})
export class JourneysModule {}
