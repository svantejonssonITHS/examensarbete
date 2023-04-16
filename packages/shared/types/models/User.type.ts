import { FavoriteRoute } from './FavoriteRoute.type';

export type User = {
	id: number;
	auth0Id: string;
	favoriteRoutes: FavoriteRoute[];
};

export type UserCreationAttributes = Omit<User, 'id' | 'favoriteRoutes'>;
