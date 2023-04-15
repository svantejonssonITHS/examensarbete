// External dependencies
import { Injectable, Logger } from '@nestjs/common';

// Internal dependencies
import { HTTPResponse, StationsResponse } from '_packages/shared/types';
import { DatabaseProvider } from '$src/providers/database/database.provider';

@Injectable()
export class StationsService {
	constructor(private databaseProvider: DatabaseProvider) {}

	private readonly logger = new Logger(StationsService.name);

	async getStations(name: string): Promise<HTTPResponse<StationsResponse>> {
		try {
			const stations = await this.databaseProvider.getStationsByName(name);

			return {
				success: true,
				message: 'Successfully fetched Stations of services',
				stations: stations
			};
		} catch (error) {
			this.logger.error(error.message);

			return {
				success: false,
				message: error.message,
				stations: []
			};
		}
	}
}
