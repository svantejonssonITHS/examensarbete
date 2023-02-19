// External dependencies
import axios from 'axios';

// Internal dependencies
import env from './env.util';

// Create object västtrafik
const vasttrafik = axios.create({
	baseURL: 'https://api.vasttrafik.se',
	headers: {
		Authorization: `Bearer ${env.VASTTRAFIK_API_KEY}`
	},
	validateStatus: () => true
});

export default {
	getHealth: async () => {
		try {
			const journeyPlanner = await vasttrafik.get('/bin/rest.exe/v2/trip');
			const geography = await vasttrafik.get('/geo/v2/StopPoints');
			const trafficSituations = await vasttrafik.get('/ts/v1/traffic-situations');

			return {
				overall: journeyPlanner.status === 200 && geography.status === 200 && trafficSituations.status === 200,
				journeyPlanner: journeyPlanner.status === 200,
				geography: geography.status === 200,
				trafficSituations: trafficSituations.status === 200
			};
		} catch (error) {
			return {
				overall: false,
				journeyPlanner: false,
				geography: false,
				trafficSituations: false
			};
		}
	}
};
