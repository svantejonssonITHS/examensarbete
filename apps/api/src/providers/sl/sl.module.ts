// External dependencies
import { Module, CacheModule } from '@nestjs/common';

// Internal dependencies
import { SLProvider } from './sl.provider';

@Module({
	imports: [CacheModule.register()],
	providers: [SLProvider],
	exports: [SLProvider]
})
export class SLModule {}
