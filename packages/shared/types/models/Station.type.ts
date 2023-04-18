import { FavoriteRoute } from './FavoriteRoute.type';
import { FavoriteStation } from './FavoriteStation.type';
import { Geometry } from './Geometry.type';
import { Position } from './Position.type';

export type Station = {
	id: number;
	vasttrafikId: string;
	name: string;
	shortName: string;
	abbreviation: string;
	geometry: Geometry | null;
	positions: Position[] | null;
	favoriteRoutesWhereOrigin: FavoriteRoute[] | null;
	favoriteRoutesWhereDestination: FavoriteRoute[] | null;
	favoriteStationsWhereStation: FavoriteStation[] | null;
};

export type StationCreationAttributes = Omit<
	Station,
	| 'id'
	| 'geometry'
	| 'positions'
	| 'favoriteRoutesWhereOrigin'
	| 'favoriteRoutesWhereDestination'
	| 'favoriteStationsWhereStation'
>;
