// External dependencies
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Internal dependencies
import { HttpResponse, GetHealthResponse } from '_packages/shared/types/http';
import { SlProvider } from '$src/providers/sl/sl.provider';
import { DatabaseProvider } from '$src/providers/database/database.provider';

@Injectable()
export class HealthService {
	constructor(private sl: SlProvider, private databaseProvider: DatabaseProvider) {}

	private readonly logger = new Logger(HealthService.name);

	async getHealth(): Promise<HttpResponse<GetHealthResponse>> {
		try {
			// Check health of database
			const databaseHealth = await this.databaseProvider.checkConnection();

			// Check health of Sl apis
			const slHealth = await this.sl.getHealth();

			this.logger.log('Sending health of services');

			return {
				success: true,
				message: 'Successfully fetched health of services',
				uptime: process.uptime(),
				timestamp: Date.now(),
				database: {
					connected: databaseHealth
				},
				sl: slHealth
			};
		} catch (error) {
			this.logger.error('An error occurred while trying to get health of services', error.stack);

			throw new InternalServerErrorException({
				success: false,
				message: 'An error occurred while trying to get health of services'
			});
		}
	}
}
