// External dependencies
import { Injectable, Logger } from '@nestjs/common';

// Internal dependencies
import { HTTPResponse, StationsResponse } from '_packages/shared/types';
import { VasttrafikProvider } from '$src/providers/vasttrafik/vasttrafik.provider';
import { DatabaseProvider } from '$src/providers/database/database.provider';

@Injectable()
export class StationsService {
	constructor(private vasttrafik: VasttrafikProvider, private databaseProvider: DatabaseProvider) {}

	private readonly logger = new Logger(StationsService.name);

	async getStations(): Promise<HTTPResponse<StationsResponse>> {
		try {
			// Check Stations of Västtrafik APIs
			const stations = await this.databaseProvider.getStations();

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
