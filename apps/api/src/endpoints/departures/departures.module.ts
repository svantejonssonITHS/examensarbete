// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { DeparturesService } from './departures.service';
import { DeparturesController } from './departures.controller';
import { SlModule } from '$src/providers/sl/sl.module';

@Module({
	imports: [SlModule],
	controllers: [DeparturesController],
	providers: [DeparturesService]
})
export class DeparturesModule {}
