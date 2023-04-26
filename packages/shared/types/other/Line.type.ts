import { LineHue, TransportType } from '../../enums';

export type Line = {
	lineNumber: string | null;
	destination: string | null;
	transportType: TransportType;
	lineHue: LineHue | null;
	path: number[] | null; // Array of initial coordinates and adjustments
};
