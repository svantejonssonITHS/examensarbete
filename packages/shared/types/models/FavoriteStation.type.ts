import { Station } from './Station.type';
import { User } from './User.type';

export type FavoriteStation = {
	id: number;
	user: User | number;
	station: Station | number;
};

export type FavoriteStationCreationAttributes = Omit<FavoriteStation, 'id' | 'user' | 'station'> & {
	userId: number;
	stationId: number;
};
