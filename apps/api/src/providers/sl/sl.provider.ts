// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

// Internal dependencies
import { SLHealth, SLSite, SLStopArea } from '$src/types/sl.type';
import env from '$src/utils/env.util';

const stationApi = axios.create({
	baseURL: `https://api.sl.se/api2/LineData.json?key=${env.SL_STATIONS_API_KEY}`,
	validateStatus: () => true
});

const departureApi = axios.create({
	baseURL: `https://api.sl.se/api2/realtimedeparturesV4.json?key=${env.SL_DEPARTURES_API_KEY}`,
	validateStatus: () => true
});

const journeyApi = axios.create({
	baseURL: `https://api.sl.se/api2/TravelplannerV3_1/trip.json?key=${env.SL_JOURNEY_API_KEY}`,
	validateStatus: () => true
});

@Injectable()
export class SLProvider {
	private readonly logger = new Logger(SLProvider.name);

	async getHealth(): Promise<SLHealth> {
		try {
			const station = await stationApi.get('');
			const departure = await departureApi.get('');
			const journey = await journeyApi.get('');

			return {
				connected: station.status === 200 && departure.status === 200 && journey.status === 200,
				station: { connected: station.status === 200 },
				departure: { connected: departure.status === 200 },
				journey: { connected: journey.status === 200 }
			};
		} catch (error) {
			this.logger.error('An error occurred while trying to get health of SL APIs', error.stack);
			return {
				connected: false,
				station: { connected: false },
				departure: { connected: false },
				journey: { connected: false }
			};
		}
	}

	async getSites(): Promise<SLSite[]> {
		try {
			const sites = await stationApi.get('', {
				params: {
					model: 'site'
				}
			});

			if (sites.status !== 200) {
				throw new Error(`Failed to fetch sites from SL. Status code: ${sites.status}`);
			}

			this.logger.log('Sending sites from SL API');

			return sites.data.ResponseData.Result;
		} catch (error) {
			this.logger.error('An error occurred while trying to get sites from SL API', error.stack);
		}
	}

	async getStopAreas(): Promise<SLStopArea[]> {
		try {
			const stopAreas = await stationApi.get('', {
				params: {
					model: 'area'
				}
			});

			if (stopAreas.status !== 200) {
				throw new Error(`Failed to fetch stop areas from SL. Status code: ${stopAreas.status}`);
			}

			this.logger.log('Sending stop areas from SL API');

			return stopAreas.data.ResponseData.Result;
		} catch (error) {
			this.logger.error('An error occurred while trying to get stop areas from SL API', error.stack);
		}
	}
}
