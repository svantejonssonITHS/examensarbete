export type VasttrafikHealth = {
	connected: boolean;
	journeyPlanner: {
		connected: boolean;
	};
	geography: {
		connected: boolean;
	};
	trafficSituations: {
		connected: boolean;
	};
};

// Additional fields exists on these types, but they are not used in this project. See the Västtrafik API documentation for more information.
export type VasttrafikStopArea = {
	gid: string;
	number: number;
	name: string;
	shortName: string;
	geometry: VasttrafikGeometry;
	stopPoints: VasttrafikStopPoint[];
};

export type VasttrafikStopPoint = {
	gid: string;
	name: string;
	shortName: string;
	designation: string;
	geometry: VasttrafikGeometry;
};

export type VasttrafikGeometry = {
	northingCoordinate: number;
	eastingCoordinate: number;
	wkt: string;
	srid: number;
	coordinateSystemName: string;
};
