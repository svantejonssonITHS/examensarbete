import { FavoriteRoute } from './FavoriteRoute.type';
import { FavoriteStation } from './FavoriteStation.type';

export type Station = {
	id: number;
	slId: string;
	name: string;
	northingCoordinate: number;
	eastingCoordinate: number;
	favoriteRoutesWhereOrigin: FavoriteRoute[] | null;
	favoriteRoutesWhereDestination: FavoriteRoute[] | null;
	favoriteStationsWhereStation: FavoriteStation[] | null;
};

export type StationCreationAttributes = Omit<
	Station,
	'id' | 'favoriteRoutesWhereOrigin' | 'favoriteRoutesWhereDestination' | 'favoriteStationsWhereStation'
>;
