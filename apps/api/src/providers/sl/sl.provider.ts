// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

// Internal dependencies
import { SLHealth, SLLineGroup, SLSite, SLStopArea } from '$src/types/sl.type';
import env from '$src/utils/env.util';
import { Departure } from '_packages/shared/types/other';
import { LineHue, TransportType } from '_packages/shared/enums';

const stationApi = axios.create({
	baseURL: `https://api.sl.se/api2/LineData.json?key=${env.SL_STATIONS_API_KEY}`,
	validateStatus: () => true
});

const departureApi = axios.create({
	baseURL: `https://api.sl.se/api2/realtimedeparturesV4.json?key=${env.SL_DEPARTURES_API_KEY}`,
	validateStatus: () => true
});

const journeyApi = axios.create({
	baseURL: `https://api.sl.se/api2/TravelplannerV3_1/trip.json?key=${env.SL_JOURNEY_API_KEY}`,
	validateStatus: () => true
});

@Injectable()
export class SLProvider {
	private readonly logger = new Logger(SLProvider.name);

	async getHealth(): Promise<SLHealth> {
		try {
			const station = await stationApi.get('');
			const departure = await departureApi.get('');
			const journey = await journeyApi.get('');

			return {
				connected: station.status === 200 && departure.status === 200 && journey.status === 200,
				station: { connected: station.status === 200 },
				departure: { connected: departure.status === 200 },
				journey: { connected: journey.status === 200 }
			};
		} catch (error) {
			this.logger.error('An error occurred while trying to get health of SL APIs', error.stack);
			return {
				connected: false,
				station: { connected: false },
				departure: { connected: false },
				journey: { connected: false }
			};
		}
	}

	async getSites(): Promise<SLSite[]> {
		try {
			const sites = await stationApi.get('', {
				params: {
					model: 'site'
				}
			});

			if (sites.status !== 200) {
				throw new Error(`Failed to fetch sites from SL. Status code: ${sites.status}`);
			}

			this.logger.log('Sending sites from SL API');

			return sites.data.ResponseData.Result;
		} catch (error) {
			this.logger.error('An error occurred while trying to get sites from SL API', error.stack);
		}
	}

	async getStopAreas(): Promise<SLStopArea[]> {
		try {
			const stopAreas = await stationApi.get('', {
				params: {
					model: 'area'
				}
			});

			if (stopAreas.status !== 200) {
				throw new Error(`Failed to fetch stop areas from SL. Status code: ${stopAreas.status}`);
			}

			this.logger.log('Sending stop areas from SL API');

			return stopAreas.data.ResponseData.Result;
		} catch (error) {
			this.logger.error('An error occurred while trying to get stop areas from SL API', error.stack);
		}
	}

	async getDepartures(siteId: string): Promise<Departure[]> {
		try {
			const departures = await departureApi.get('', {
				params: {
					SiteId: siteId,
					TimeWindow: 60,
					Metro: true
				}
			});

			if (departures.status !== 200) {
				throw new Error(`Failed to fetch departures from SL. Status code: ${departures.status}`);
			}

			if (departures.data.StatusCode === 4001) {
				throw new Error('No departures found');
			}

			const formattedDepartures: Departure[] = [];

			departures.data.ResponseData.Buses.forEach((bus) => {
				formattedDepartures.push({
					transportType: TransportType.BUS,
					lineHue: bus.LineGroup === SLLineGroup.BUS_BLUE ? LineHue.BLUE : LineHue.RED,
					lineNumber: bus.LineNumber,
					destination: bus.Destination,
					timeTabledDateTime: bus.TimeTabledDateTime,
					expectedDateTime: bus.ExpectedDateTime
				});
			});

			departures.data.ResponseData.Metros.forEach((metro) => {
				formattedDepartures.push({
					transportType: TransportType.METRO,
					lineHue:
						metro.LineGroup === SLLineGroup.METRO_BLUE
							? LineHue.BLUE
							: metro.LineGroup === SLLineGroup.METRO_GREEN
							? LineHue.GREEN
							: LineHue.RED,
					lineNumber: metro.LineNumber,
					destination: metro.Destination,
					timeTabledDateTime: metro.TimeTabledDateTime,
					expectedDateTime: metro.ExpectedDateTime
				});
			});

			departures.data.ResponseData.Ships.forEach((ship) => {
				formattedDepartures.push({
					transportType: TransportType.SHIP,
					lineHue: LineHue.BLUE,
					lineNumber: ship.LineNumber,
					destination: ship.Destination,
					timeTabledDateTime: ship.TimeTabledDateTime,
					expectedDateTime: ship.ExpectedDateTime
				});
			});

			departures.data.ResponseData.Trains.forEach((train) => {
				formattedDepartures.push({
					transportType: TransportType.TRAIN,
					lineHue: LineHue.PINK,
					lineNumber: train.LineNumber,
					destination: train.Destination,
					timeTabledDateTime: train.TimeTabledDateTime,
					expectedDateTime: train.ExpectedDateTime
				});
			});

			departures.data.ResponseData.Trams.forEach((tram) => {
				formattedDepartures.push({
					transportType: TransportType.TRAM,
					lineHue: [SLLineGroup.TRAM_CITY, SLLineGroup.TRAM_DJURGARDEN].includes(tram.LineGroup)
						? LineHue.GRAY
						: tram.LineGroup === SLLineGroup.TRAM_NOCKEBY
						? LineHue.TURQUOISE
						: tram.LineGroup === SLLineGroup.TRAM_LIDINGO
						? LineHue.BROWN
						: tram.LineGroup === SLLineGroup.TRAM_TVAR
						? LineHue.ORANGE
						: null,
					lineNumber: tram.LineNumber,
					destination: tram.Destination,
					timeTabledDateTime: tram.TimeTabledDateTime,
					expectedDateTime: tram.ExpectedDateTime
				});
			});

			this.logger.log('Sending departures from SL API');

			return formattedDepartures;
		} catch (error) {
			this.logger.error('An error occurred while trying to get departures from SL API', error.stack);
		}
	}
}
