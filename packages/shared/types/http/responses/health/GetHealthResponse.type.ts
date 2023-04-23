export type GetHealthResponse = {
	uptime: number;
	timestamp: number;
	database: {
		connected: boolean;
	};
	sl: {
		connected: boolean;
		station: { connected: boolean };
		departure: { connected: boolean };
		journey: { connected: boolean };
	};
};
