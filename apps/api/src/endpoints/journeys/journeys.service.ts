// External dependencies
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Internal dependencies
import { HttpResponse, GetJourneysRequest, GetJourneysResponse } from '_packages/shared/types/http';
import { SLProvider } from '$src/providers/sl/sl.provider';
import { SLJourneyRequest } from '$src/types/sl.type';

@Injectable()
export class JourneysService {
	constructor(private sl: SLProvider) {}

	private readonly logger = new Logger(JourneysService.name);

	async getJourneys(queries: GetJourneysRequest): Promise<HttpResponse<GetJourneysResponse>> {
		try {
			const requestParams: SLJourneyRequest = {
				originId: queries.originId,
				destId: queries.destinationId
			};

			if (queries.date && queries.time && queries.isArrivalTime) {
				requestParams.Date = queries.date;
				requestParams.Time = queries.time;
				requestParams.searchForArrival = queries.isArrivalTime ? 1 : 0;
			}

			const journeys = await this.sl.getJourneys(requestParams);

			if (!journeys) throw new InternalServerErrorException();

			return {
				success: true,
				message: 'Successfully got journeys',
				journeys
			};
		} catch (error) {
			this.logger.error(error.message);

			throw new InternalServerErrorException({
				success: false,
				message: 'Failed to get journeys'
			});
		}
	}
}
