// External dependencies
import { Module, CacheModule } from '@nestjs/common';

// Internal dependencies
import { VasttrafikProvider } from './vasttrafik.provider';

@Module({
	imports: [CacheModule.register()],
	providers: [VasttrafikProvider],
	exports: [VasttrafikProvider]
})
export class VasttrafikModule {}
