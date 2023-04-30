// External dependencies
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Internal dependencies
import { HttpResponse, GetDeparturesRequest, GetDeparturesResponse } from '_packages/shared/types/http';
import { SlProvider } from '$src/providers/sl/sl.provider';

@Injectable()
export class DeparturesService {
	constructor(private sl: SlProvider) {}

	private readonly logger = new Logger(DeparturesService.name);

	async getDepartures(queries: GetDeparturesRequest): Promise<HttpResponse<GetDeparturesResponse>> {
		try {
			const departures = await this.sl.getDepartures(queries.slId);

			if (!departures) throw new InternalServerErrorException();

			return {
				success: true,
				message: 'Successfully got departures',
				departures
			};
		} catch (error) {
			this.logger.error(error.message);

			throw new InternalServerErrorException({
				success: false,
				message: 'Failed to get departures'
			});
		}
	}
}
