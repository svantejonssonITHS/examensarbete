// External dependencies
import { Module, CacheModule } from '@nestjs/common';

// Internal dependencies
import { SlProvider } from './sl.provider';

@Module({
	imports: [CacheModule.register()],
	providers: [SlProvider],
	exports: [SlProvider]
})
export class SlModule {}
