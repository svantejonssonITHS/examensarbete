import { Position } from './Position.type';
import { Station } from './Station.type';

export type Geometry = {
	id: number;
	longitude: number;
	latitude: number;
	srid: number;
	position: Position | number;
	station: Station | number;
};

export type GeometryCreationAttributes =
	| (Omit<Geometry, 'id' | 'position' | 'station'> & { positionId?: never; stationId: number })
	| (Omit<Geometry, 'id' | 'position' | 'station'> & { positionId: number; stationId?: never });
