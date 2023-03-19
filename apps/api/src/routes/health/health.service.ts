// External dependencies
import { Injectable, Logger } from '@nestjs/common';

// Internal dependencies
import { HealthResponse } from '_packages/shared/types';
import { VasttrafikProvider } from '$src/providers/vasttrafik/vasttrafik.provider';
import { DatabaseProvider } from '$src/providers/database/database.provider';

@Injectable()
export class HealthService {
	constructor(private vasttrafik: VasttrafikProvider, private databaseProvider: DatabaseProvider) {}

	private readonly logger = new Logger(HealthService.name);

	async getHealth(): Promise<HealthResponse> {
		try {
			// Check health of database
			const databaseHealth = await this.databaseProvider.checkConnection();

			// Check health of Västtrafik APIs
			const vasttrafikHealth = await this.vasttrafik.getHealth();

			this.logger.log('Sending health of services');

			return {
				success: true,
				message: 'Successfully fetched health of services',
				uptime: process.uptime(),
				timestamp: Date.now(),
				database: {
					connected: databaseHealth
				},
				vasttrafik: vasttrafikHealth
			};
		} catch (error) {
			this.logger.error('An error occurred while trying to get health of services', error.stack);

			return {
				success: false,
				message: 'An error occurred while trying to get health of services',
				uptime: process.uptime(),
				timestamp: Date.now(),
				database: {
					connected: false
				},
				vasttrafik: {
					connected: false,
					journeyPlanner: { connected: false },
					geography: { connected: false },
					trafficSituations: { connected: false }
				}
			};
		}
	}
}
