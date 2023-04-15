import { Geometry } from './Geometry.type';
import { Position } from './Position.type';
import { Route } from './Route.type';

export type Station = {
	id: number;
	vasttrafikId: string;
	name: string;
	shortName: string;
	abbreviation: string;
	geometry: Geometry;
	positions: Position[];
	routesWhereOrigin: Route[];
	routesWhereDestination: Route[];
};

export type StationCreationAttributes = Omit<
	Station,
	'id' | 'geometry' | 'positions' | 'routesWhereOrigin' | 'routesWhereDestination'
>;
