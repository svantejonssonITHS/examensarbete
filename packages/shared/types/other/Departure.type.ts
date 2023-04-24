import { LineHue, TransportType } from '../../enums';

export type Departure = {
	transportType: TransportType;
	lineHue: LineHue | null;
	lineNumber: string;
	destination: string;
	timeTabledDateTime: string; // ISO 8601
	expectedDateTime: string | null; // ISO 8601
};
