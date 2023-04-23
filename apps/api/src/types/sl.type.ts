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

/**
 * @description `null` values also occur
 */
export enum SLLineGroup {
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
