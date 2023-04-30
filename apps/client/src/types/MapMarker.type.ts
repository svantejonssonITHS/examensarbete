import { MapMarkerType } from '$src/enums/MapMarkerType.enum';

export type MapMarker = {
	type: MapMarkerType;
	color: string;
	positions: number[][];
};
