// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Internal dependencies
import vasttrafik from 'src/utils/vasttrafik.util';
import { HealthResponse } from '_packages/shared/types';

@Injectable()
export class HealthService {
	constructor(private dataSource: DataSource) {}

	async getHealth(): Promise<HealthResponse> {
		try {
			// Check health of database
			const databaseHealth = await this.databaseHealth();

			// Check health of Västtrafik APIs
			const vasttrafikHealth = await vasttrafik.getHealth();

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
			Logger.error('An error occurred while trying to get health of services', error.stack, 'Health');

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
			Logger.error('An error occurred while trying to get health of database', error.stack, 'Database');

			return false;
		}
	}
}
