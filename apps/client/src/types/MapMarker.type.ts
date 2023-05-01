import { MapMarkerType } from '$src/enums/MapMarkerType.enum';

export type MapMarker = {
	type: MapMarkerType;
	colorAsClass?: string;
	positions: number[][];
};
