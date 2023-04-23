import { TransportType } from '../../enums/TransportType.enum';

export type Departure = {
	transportType: TransportType;
	lineHue: string | null;
	lineNumber: string;
	destination: string;
	timeTabledDateTime: string; // ISO 8601
	expectedDateTime: string | null; // ISO 8601
};
