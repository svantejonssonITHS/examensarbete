export type SLHealth = {
	connected: boolean;
	station: {
		connected: boolean;
	};
	departure: {
		connected: boolean;
	};
	journey: {
		connected: boolean;
	};
};

// Additional fields exists on these types, but they are not used in this project. See the SL API (Trafiklab) documentation for more information.
export type SLSite = {
	SiteId: string;
	SiteName: string;
	StopAreaNumber: string;
};

export type SLStopArea = {
	StopAreaNumber: string;
	CentroidNorthingCoordinate: number;
	CentroidEastingCoordinate: number;
};
