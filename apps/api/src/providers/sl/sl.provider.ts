// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as dayjs from 'dayjs';

// Internal dependencies
import { SlHealth, SlJourneyRequest, SlSite, SlStopArea } from '$src/types/Sl.type';
import env from '$src/utils/env.util';
import { Departure, DestinationStop, Journey, Line, OriginStop } from '_packages/shared/types/other';
import { LineHue, TransportType } from '_packages/shared/enums';
import calculateLineHue from '$src/utils/calculateLineHue.util';
import calculatePositions from '$src/utils/calculatePositions.util';

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
export class SlProvider {
	private readonly logger = new Logger(SlProvider.name);

	async getHealth(): Promise<SlHealth> {
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
			this.logger.error('An error occurred while trying to get health of Sl apis', error.stack);
			return {
				connected: false,
				station: { connected: false },
				departure: { connected: false },
				journey: { connected: false }
			};
		}
	}

	async getSites(): Promise<SlSite[]> {
		try {
			const sites = await stationApi.get('', {
				params: {
					model: 'site'
				}
			});

			if (sites.status !== 200 || !sites.data.ResponseData) {
				throw new Error(`Failed to fetch sites from Sl. Status code: ${sites.status}`);
			}

			this.logger.log('Sending sites from Sl api');

			return sites.data.ResponseData.Result;
		} catch (error) {
			this.logger.error('An error occurred while trying to get sites from Sl api', error.stack);

			throw new Error('Failed to fetch sites from Sl');
		}
	}

	async getStopAreas(): Promise<SlStopArea[]> {
		try {
			const stopAreas = await stationApi.get('', {
				params: {
					model: 'area'
				}
			});

			if (stopAreas.status !== 200 || !stopAreas.data.ResponseData) {
				throw new Error(`Failed to fetch stop areas from Sl. Status code: ${stopAreas.status}`);
			}

			this.logger.log('Sending stop areas from Sl api');

			return stopAreas.data.ResponseData.Result;
		} catch (error) {
			this.logger.error('An error occurred while trying to get stop areas from Sl api', error.stack);

			throw new Error('Failed to fetch stop areas from Sl');
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
				throw new Error(`Failed to fetch departures from Sl. Status code: ${departures.status}`);
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
						dayjs(duplicate.expectedDateTime ?? duplicate.timeTabledDateTime).isBefore(
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
					lineHue: calculateLineHue(TransportType.BUS, bus.GroupOfLine),
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
					lineHue: calculateLineHue(TransportType.METRO, metro.GroupOfLine),
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

			departures.data.ResponseData.Trams.forEach((tram) => {
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
					lineHue: calculateLineHue(TransportType.TRAM, tram.GroupOfLine),
					lineNumber: tram.LineNumber,
					destination: tram.Destination,
					timeTabledDateTime: tram.TimeTabledDateTime,
					expectedDateTime: tram.ExpectedDateTime
				});
			});

			this.logger.log('Sending departures from Sl api');

			return [
				...formattedBuses,
				...formattedMetros,
				...formattedShips,
				...formattedTrains,
				...formattedTrams
				// Sort the departures by time
			].sort((a, b) => {
				const aTime = a.expectedDateTime ?? a.timeTabledDateTime;
				const bTime = b.expectedDateTime ?? b.timeTabledDateTime;

				if (aTime && bTime) {
					return dayjs(aTime).isBefore(bTime) ? -1 : 1;
				}

				return 0;
			});
		} catch (error) {
			this.logger.error('An error occurred while trying to get departures from Sl api', error.stack);

			throw new Error('An error occurred while trying to get departures from Sl api');
		}
	}

	async getJourneys(queries: SlJourneyRequest) {
		try {
			const journeys = await journeyApi.get('', {
				params: {
					...queries,
					// The values of all returned data (including data used in formatting the response, so DO NOT CHANGE)
					Lang: 'sv',
					// Includes the geometry of the journey
					Poly: 1
				}
			});

			if (journeys.status !== 200) {
				throw new Error(`Sl api returned status code ${journeys.status}`);
			}

			const formattedJourneys = [];

			if (!journeys.data.Trip) return formattedJourneys;

			journeys.data.Trip.forEach((trip) => {
				const journey: Journey = {
					legs: []
				};

				trip.LegList.Leg.forEach((leg) => {
					const originStop: OriginStop = {
						name: leg.Origin.name,
						designation: leg.Origin.track ?? null,
						departureDateTime: leg.Origin.date + 'T' + leg.Origin.time,
						northingCoordinate: leg.Origin.lat,
						eastingCoordinate: leg.Origin.lon
					};

					const destinationStop: DestinationStop = {
						name: leg.Destination.name,
						designation: leg.Destination.track ?? null,
						arrivalDateTime: leg.Destination.date + 'T' + leg.Destination.time,
						northingCoordinate: leg.Destination.lat,
						eastingCoordinate: leg.Destination.lon
					};

					const transportType = leg.Product
						? leg.Product.catOut.trim().toLowerCase()
						: leg.type.trim().toLowerCase();

					const line: Line = {
						lineNumber: leg.Product ? leg.Product.line : null,
						destination: leg.direction,
						transportType: transportType,
						lineHue: calculateLineHue(transportType, leg.name),
						path: leg.Polyline ? calculatePositions(leg.Polyline.crd) : null
					};

					journey.legs.push({
						originStop,
						destinationStop,
						line
					});
				});

				formattedJourneys.push(journey);
			});

			return formattedJourneys;
		} catch (error) {
			this.logger.error('An error occurred while trying to get journeys from Sl api', error.stack);

			throw new Error('An error occurred while trying to get journeys from Sl api');
		}
	}
}
