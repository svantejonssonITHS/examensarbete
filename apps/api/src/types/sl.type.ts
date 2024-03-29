export type SlHealth = {
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

// Additional fields exists on these types, but they are not used in this project. See the Sl api (Trafiklab) documentation for more information.
export type SlSite = {
	SiteId: string;
	SiteName: string;
	StopAreaNumber: string;
};

export type SlStopArea = {
	StopAreaNumber: string;
	CentroidNorthingCoordinate: number;
	CentroidEastingCoordinate: number;
};

/**
 * @description `null` values also occur
 */
export enum SlLineGroup {
	BUS_BLUE = 'blåbuss',
	METRO_BLUE = 'tunnelbanans blå linje',
	METRO_GREEN = 'tunnelbanans gröna linje',
	METRO_RED = 'tunnelbanans röda linje',
	TRAM_CITY = 'Spårväg City',
	TRAM_DJURGARDEN = 'Djurgårdslinjen',
	TRAM_NOCKEBY = 'Nockebybanan',
	TRAM_LIDINGO = 'Lidingöbanan',
	TRAM_TVAR = 'Tvärbanan',
	TRAIN = 'Pendeltåg',
	SHIP = 'Pendelbåt',
	SHIP_WAXHOLM = 'Waxholmsbolagets'
}

// https://www.trafiklab.se/api/trafiklab-apis/sl/route-planner-31/
export type SlJourneyRequest = {
	Lang?: string;
	originId: string;
	destId: string;
	Date?: string;
	Time?: string;
	searchForArrival?: 0 | 1;
};
