// External dependencies
import axios from 'axios';
import { Logger } from '@nestjs/common';

// Internal dependencies
import env from './env.util';
import { VasttrafikHealth } from '$src/types';

// Create object västtrafik
const vasttrafik = axios.create({
	baseURL: 'https://api.vasttrafik.se',
	headers: {
		Authorization: `Bearer ${env.VASTTRAFIK_API_KEY}`
	},
	validateStatus: () => true
});

export default {
	getHealth: async (): Promise<VasttrafikHealth> => {
		try {
			const journeyPlanner = await vasttrafik.get('/bin/rest.exe/v2/trip');
			const geography = await vasttrafik.get('/geo/v2/StopAreas?offset=0&limit=1');
			const trafficSituations = await vasttrafik.get('/ts/v1/traffic-situations');

			return {
				connected:
					journeyPlanner.status === 200 && geography.status === 200 && trafficSituations.status === 200,
				journeyPlanner: { connected: journeyPlanner.status === 200 },
				geography: { connected: geography.status === 200 },
				trafficSituations: { connected: trafficSituations.status === 200 }
			};
		} catch (error) {
			Logger.error('An error occurred while trying to get health of Västtrafik APIs', error.stack, 'Västtrafik');

			return {
				connected: false,
				journeyPlanner: { connected: false },
				geography: { connected: false },
				trafficSituations: { connected: false }
			};
		}
	}
};
