// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Internal dependencies
import { HealthResponse } from '_packages/shared/types';
import { VasttrafikProvider } from '$src/providers/vasttrafik/vasttrafik.provider';

@Injectable()
export class HealthService {
	constructor(private dataSource: DataSource, private vasttrafik: VasttrafikProvider) {}

	private readonly logger = new Logger(HealthService.name);

	async getHealth(): Promise<HealthResponse> {
		try {
			// Check health of database
			const databaseHealth = await this.databaseHealth();

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

	private async databaseHealth(): Promise<boolean> {
		try {
			/*
            Tries to use/create a connection to the database
            If it fails, it will throw an error, meaning that the database is not working as expected
            */
			await this.dataSource.createQueryRunner().connect();

			return true;
		} catch (error) {
			this.logger.error('An error occurred while trying to get health of database', error.stack);

			return false;
		}
	}
}