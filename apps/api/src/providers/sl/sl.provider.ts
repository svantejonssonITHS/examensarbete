// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as dayjs from 'dayjs';

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

			const formattedBuses: Departure[] = [];

			departures.data.ResponseData.Buses.forEach((bus) => {
				const duplicate = formattedBuses.find(
					(b) => b.lineNumber === bus.LineNumber && b.destination === bus.Destination
				);

				// Check if the duplicates time (TimeTabledDateTime & ExpectedDateTime) is earlier than the current one
				if (duplicate) {
					if (
						dayjs(duplicate.expectedDateTime ?? duplicate.timeTabledDateTime).isAfter(
							bus.ExpectedDateTime ?? bus.TimeTabledDateTime
						)
					) {
						duplicate.expectedDateTime = bus.ExpectedDateTime;
						duplicate.timeTabledDateTime = bus.TimeTabledDateTime;
					}

					return;
				}

				formattedBuses.push({
					transportType: TransportType.BUS,
					lineHue: bus.GroupOfLine === SLLineGroup.BUS_BLUE ? LineHue.BLUE : LineHue.RED,
					lineNumber: bus.LineNumber,
					destination: bus.Destination,
					timeTabledDateTime: bus.TimeTabledDateTime,
					expectedDateTime: bus.ExpectedDateTime
				});
			});

			const formattedMetros: Departure[] = [];

			departures.data.ResponseData.Metros.forEach((metro) => {
				const duplicate = formattedMetros.find(
					(b) => b.lineNumber === metro.LineNumber && b.destination === metro.Destination
				);

				// Check if the duplicates time (TimeTabledDateTime & ExpectedDateTime) is earlier than the current one
				if (duplicate) {
					if (
						dayjs(duplicate.expectedDateTime ?? duplicate.timeTabledDateTime).isAfter(
							metro.ExpectedDateTime ?? metro.TimeTabledDateTime
						)
					) {
						duplicate.expectedDateTime = metro.ExpectedDateTime;
						duplicate.timeTabledDateTime = metro.TimeTabledDateTime;
					}

					return;
				}

				formattedMetros.push({
					transportType: TransportType.METRO,
					lineHue:
						metro.GroupOfLine === SLLineGroup.METRO_BLUE
							? LineHue.BLUE
							: metro.GroupOfLine === SLLineGroup.METRO_GREEN
							? LineHue.GREEN
							: LineHue.RED,
					lineNumber: metro.LineNumber,
					destination: metro.Destination,
					timeTabledDateTime: metro.TimeTabledDateTime,
					expectedDateTime: metro.ExpectedDateTime
				});
			});

			const formattedShips: Departure[] = [];

			departures.data.ResponseData.Ships.forEach((ship) => {
				const duplicate = formattedShips.find(
					(b) => b.lineNumber === ship.LineNumber && b.destination === ship.Destination
				);

				// Check if the duplicates time (TimeTabledDateTime & ExpectedDateTime) is earlier than the current one
				if (duplicate) {
					if (
						dayjs(duplicate.expectedDateTime ?? duplicate.timeTabledDateTime).isAfter(
							ship.ExpectedDateTime ?? ship.TimeTabledDateTime
						)
					) {
						duplicate.expectedDateTime = ship.ExpectedDateTime;
						duplicate.timeTabledDateTime = ship.TimeTabledDateTime;
					}

					return;
				}

				formattedShips.push({
					transportType: TransportType.SHIP,
					lineHue: LineHue.BLUE,
					lineNumber: ship.LineNumber,
					destination: ship.Destination,
					timeTabledDateTime: ship.TimeTabledDateTime,
					expectedDateTime: ship.ExpectedDateTime
				});
			});

			const formattedTrains: Departure[] = [];

			departures.data.ResponseData.Trains.forEach((train) => {
				const duplicate = formattedTrains.find(
					(b) => b.lineNumber === train.LineNumber && b.destination === train.Destination
				);

				// Check if the duplicates time (TimeTabledDateTime & ExpectedDateTime) is earlier than the current one
				if (duplicate) {
					if (
						dayjs(duplicate.expectedDateTime ?? duplicate.timeTabledDateTime).isAfter(
							train.ExpectedDateTime ?? train.TimeTabledDateTime
						)
					) {
						duplicate.expectedDateTime = train.ExpectedDateTime;
						duplicate.timeTabledDateTime = train.TimeTabledDateTime;
					}

					return;
				}

				formattedTrains.push({
					transportType: TransportType.TRAIN,
					lineHue: LineHue.PINK,
					lineNumber: train.LineNumber,
					destination: train.Destination,
					timeTabledDateTime: train.TimeTabledDateTime,
					expectedDateTime: train.ExpectedDateTime
				});
			});

			const formattedTrams: Departure[] = [];

			departures.data.ResponseData.Trams.forEach((tram, _, array) => {
				const duplicate = formattedTrams.find(
					(b) => b.lineNumber === tram.LineNumber && b.destination === tram.Destination
				);

				// Check if the duplicates time (TimeTabledDateTime & ExpectedDateTime) is earlier than the current one
				if (duplicate) {
					if (
						dayjs(duplicate.expectedDateTime ?? duplicate.timeTabledDateTime).isAfter(
							tram.ExpectedDateTime ?? tram.TimeTabledDateTime
						)
					) {
						duplicate.expectedDateTime = tram.ExpectedDateTime;
						duplicate.timeTabledDateTime = tram.TimeTabledDateTime;
					}

					return;
				}

				formattedTrams.push({
					transportType: TransportType.TRAM,
					lineHue: [SLLineGroup.TRAM_CITY, SLLineGroup.TRAM_DJURGARDEN].includes(tram.GroupOfLine)
						? LineHue.GRAY
						: tram.GroupOfLine === SLLineGroup.TRAM_NOCKEBY
						? LineHue.TEAL
						: tram.GroupOfLine === SLLineGroup.TRAM_LIDINGO
						? LineHue.BROWN
						: tram.GroupOfLine === SLLineGroup.TRAM_TVAR
						? LineHue.ORANGE
						: null,
					lineNumber: tram.LineNumber,
					destination: tram.Destination,
					timeTabledDateTime: tram.TimeTabledDateTime,
					expectedDateTime: tram.ExpectedDateTime
				});
			});

			this.logger.log('Sending departures from SL API');

			return [...formattedBuses, ...formattedMetros, ...formattedShips, ...formattedTrains, ...formattedTrams];
		} catch (error) {
			this.logger.error('An error occurred while trying to get departures from SL API', error.stack);
		}
	}
}
