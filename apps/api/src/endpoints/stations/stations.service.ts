// External dependencies
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Internal dependencies
import { HttpResponse, GetStationsRequest, GetStationsResponse } from '_packages/shared/types/http';
import { DatabaseProvider } from '$src/providers/database/database.provider';

@Injectable()
export class StationsService {
	constructor(private databaseProvider: DatabaseProvider) {}

	private readonly logger = new Logger(StationsService.name);

	async getStations(queries: GetStationsRequest): Promise<HttpResponse<GetStationsResponse>> {
		try {
			const stations = await this.databaseProvider.getStationsByName(queries.name);

			if (!stations) throw new InternalServerErrorException();

			return {
				success: true,
				message: 'Successfully fetched stations',
				stations: stations
			};
		} catch (error) {
			this.logger.error(error.message);

			throw new InternalServerErrorException({
				success: false,
				message: 'An error occurred while trying to get stations'
			});
		}
	}
}
