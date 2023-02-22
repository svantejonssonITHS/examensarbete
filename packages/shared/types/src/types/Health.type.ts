import { HTTPResponse } from './Response.type';

export type Health = {
	uptime: number;
	timestamp: number;
	database: {
		connected: boolean;
	};
	vasttrafik: {
		connected: boolean;
		journeyPlanner: { connected: boolean };
		geography: { connected: boolean };
		trafficSituations: { connected: boolean };
	};
};

export type HealthResponse = HTTPResponse & Health;
