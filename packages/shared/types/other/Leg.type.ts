import { DestinationStop, Line, OriginStop } from '.';

export type Leg = {
	originStop: OriginStop;
	destinationStop: DestinationStop;
	line: Line;
};
