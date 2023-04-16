import { FavoriteRoute } from './FavoriteRoute.type';
import { FavoriteStation } from './FavoriteStation.type';

export type User = {
	id: number;
	auth0Id: string;
	favoriteRoutes: FavoriteRoute[];
	favoriteStations: FavoriteStation[];
};

export type UserCreationAttributes = Omit<User, 'id' | 'favoriteRoutes' | 'favoriteStations'>;
