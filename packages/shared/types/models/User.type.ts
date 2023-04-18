import { FavoriteRoute } from './FavoriteRoute.type';
import { FavoriteStation } from './FavoriteStation.type';

export type User = {
	id: number;
	auth0Id: string;
	favoriteRoutes: FavoriteRoute[] | null;
	favoriteStations: FavoriteStation[] | null;
};

export type UserCreationAttributes = Omit<User, 'id' | 'favoriteRoutes' | 'favoriteStations'>;
