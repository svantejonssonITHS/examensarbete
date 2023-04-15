export type HealthResponse = {
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
