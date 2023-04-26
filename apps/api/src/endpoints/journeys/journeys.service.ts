// External dependencies
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Internal dependencies
import { HttpResponse, GetJourneysRequest, GetJourneysResponse } from '_packages/shared/types/http';
import { SLProvider } from '$src/providers/sl/sl.provider';

@Injectable()
export class JourneysService {
	constructor(private sl: SLProvider) {}

	private readonly logger = new Logger(JourneysService.name);

	async getJourneys(queries: GetJourneysRequest): Promise<HttpResponse<GetJourneysResponse>> {
		try {
			const journeys = await this.sl.getJourneys({
				Lang: queries.lang,
				originId: queries.originId,
				destId: queries.destId,
				Date: queries.date,
				Time: queries.time,
				searchForArrival: queries.isArrivalTime ? 1 : 0
			});

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
