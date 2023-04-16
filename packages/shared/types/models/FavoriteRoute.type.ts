import { Station } from './Station.type';
import { User } from './User.type';

export type FavoriteRoute = {
	id: number;
	user: User | number;
	originStation: Station | number;
	destinationStation: Station | number;
};

export type FavoriteRouteCreationAttributes = Omit<
	FavoriteRoute,
	'id' | 'user' | 'originStation' | 'destinationStation'
> & {
	userId: number;
	originStationId: number;
	destinationStationId: number;
};
