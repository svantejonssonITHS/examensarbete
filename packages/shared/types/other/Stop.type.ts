export type Stop = {
	name: string;
	designation: string | null;
};

export type OriginStop = Stop & {
	departureDateTime: string; // ISO 8601
};

export type DestinationStop = Stop & {
	arrivalDateTime: string; // ISO 8601
};
