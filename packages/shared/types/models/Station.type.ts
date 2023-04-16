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
	geometry: Geometry;
	positions: Position[];
	favoriteRoutesWhereOrigin: FavoriteRoute[];
	favoriteRoutesWhereDestination: FavoriteRoute[];
	favoriteStationsWhereStation: FavoriteStation[];
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
