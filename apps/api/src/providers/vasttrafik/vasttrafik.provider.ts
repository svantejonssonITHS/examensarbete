// External dependencies
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';

// Internal dependencies
import { VasttrafikHealth } from '$src/types';
import env from '$src/utils/env.util';
import { VasttrafikStopArea } from '$src/types/vasttrafik.type';

const authAPI = axios.create({
	baseURL: 'https://api.vasttrafik.se:443',
	validateStatus: () => true
});

const vasttrafikAPI = axios.create({
	baseURL: 'https://api.vasttrafik.se',
	validateStatus: () => true
});

@Injectable()
export class VasttrafikProvider {
	constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

	private readonly logger = new Logger(VasttrafikProvider.name);

	async getAccessToken(): Promise<void> {
		const cachedAccessToken: string | undefined = await this.cacheManager.get<string>('vasttrafikAccessToken');

		if (!cachedAccessToken) {
			this.logger.log('No cached access token found, getting new one from Västtrafik auth API');

			const authResponse = await authAPI.post('/token?grant_type=client_credentials', null, {
				headers: {
					Authorization: `Basic ${env.VASTTRAFIK_API_KEY}`
				}
			});

			if (authResponse.status !== 200) {
				throw new Error('Could not get access token from Västtrafik auth API');
			}

			await this.cacheManager.set(
				'vasttrafikAccessToken',
				// Access token
				authResponse.data.access_token,
				// TTL (Response is in seconds, we need milliseconds)
				authResponse.data.expires_in * 1000
			);
		}

		vasttrafikAPI.defaults.headers.Authorization = `Bearer ${cachedAccessToken}`;
	}

	async getHealth(): Promise<VasttrafikHealth> {
		try {
			await this.getAccessToken();

			const journeyPlanner = await vasttrafikAPI.get('/bin/rest.exe/v2/trip');
			const geography = await vasttrafikAPI.get('/geo/v2/StopAreas?offset=0&limit=1');
			const trafficSituations = await vasttrafikAPI.get('/ts/v1/traffic-situations');

			return {
				connected:
					journeyPlanner.status === 200 && geography.status === 200 && trafficSituations.status === 200,
				journeyPlanner: { connected: journeyPlanner.status === 200 },
				geography: { connected: geography.status === 200 },
				trafficSituations: { connected: trafficSituations.status === 200 }
			};
		} catch (error) {
			this.logger.error('An error occurred while trying to get health of Västtrafik APIs', error.stack);
			return {
				connected: false,
				journeyPlanner: { connected: false },
				geography: { connected: false },
				trafficSituations: { connected: false }
			};
		}
	}

	async getStopAreas(): Promise<VasttrafikStopArea[]> {
		try {
			await this.getAccessToken();

			const stopAreas = await vasttrafikAPI.get(
				'/geo/v2/StopAreas?includeStopPoints=true&includeGeometry=true&srid=4326'
			);

			if (stopAreas.status !== 200) {
				throw new Error('Could not get stop areas from Västtrafik API');
			}

			this.logger.log('Successfully fetched stop areas from Västtrafik API');

			return stopAreas.data;
		} catch (error) {
			this.logger.error('An error occurred while trying to get stop areas from Västtrafik API', error.stack);
		}
	}
}
