import { Geometry } from './Geometry.type';
import { Station } from './Station.type';

export type Position = {
	id: number;
	vasttrafikId: string;
	name: string;
	shortName: string | null;
	abbreviation: string | null;
	designation: string;
	geometry: Geometry;
	station: Station | number;
};

export type PositionCreationAttributes = Omit<Position, 'id' | 'geometry' | 'station'> & { stationId: number };
