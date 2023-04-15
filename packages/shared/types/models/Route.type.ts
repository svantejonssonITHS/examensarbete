import { Station } from './Station.type';
import { User } from './User.type';

export type Route = {
	id: number;
	user: User | number;
	originStation: Station | number;
	destinationStation: Station | number;
};

export type RouteCreationAttributes = Omit<Route, 'id' | 'user' | 'originStation' | 'destinationStation'> & {
	userId: number;
	originStationId: number;
	destinationStationId: number;
};
