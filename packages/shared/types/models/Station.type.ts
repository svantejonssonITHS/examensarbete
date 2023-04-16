import { FavoriteRoute } from './FavoriteRoute.type';
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
};

export type StationCreationAttributes = Omit<
	Station,
	'id' | 'geometry' | 'positions' | 'favoriteRoutesWhereOrigin' | 'favoriteRoutesWhereDestination'
>;
