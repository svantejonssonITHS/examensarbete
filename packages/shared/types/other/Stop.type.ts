export type Stop = {
	name: string;
	designation: string | null;
	northingCoordinate: number;
	eastingCoordinate: number;
};

export type OriginStop = Stop & {
	departureDateTime: string; // ISO 8601
};

export type DestinationStop = Stop & {
	arrivalDateTime: string; // ISO 8601
};
