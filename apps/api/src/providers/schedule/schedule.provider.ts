import { Position, Station, Geometry } from '$src/entities';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { DatabaseProvider } from '../database/database.provider';
import { VasttrafikProvider } from '../vasttrafik/vasttrafik.provider';

@Injectable()
export class ScheduleProvider {
	constructor(
		private schedulerRegistry: SchedulerRegistry,
		private databaseProvider: DatabaseProvider,
		private vasttrafikProvider: VasttrafikProvider
	) {}

	private readonly logger = new Logger(ScheduleProvider.name);

	async updateDatabase() {
		this.logger.log('Scheduled update of database started');

		try {
			const stopAreas = await this.vasttrafikProvider.getStopAreas();

			for (const stopArea of stopAreas) {
				const positions: Position[] = [];

				for (const stopPoint of stopArea.stopPoints) {
					const positionGeometry: Geometry = {
						longitude: stopPoint.geometry.eastingCoordinate,
						latitude: stopPoint.geometry.northingCoordinate
					};

					const position: Position = {
						vasttrafikId: stopPoint.gid,
						name: stopPoint.name,
						shortName: stopPoint.shortName,
						abbreviation: stopPoint.abbreviation,
						designation: stopPoint.designation,
						geometry: await this.databaseProvider.createGeometry(positionGeometry)
					};

					positions.push(await this.databaseProvider.createPosition(position));
				}

				const stationGeometry: Geometry = {
					longitude: stopArea.geometry.eastingCoordinate,
					latitude: stopArea.geometry.northingCoordinate
				};

				const station: Station = {
					vasttrafikId: stopArea.gid,
					name: stopArea.name,
					shortName: stopArea.shortName,
					abbreviation: stopArea.abbreviation,
					geometry: await this.databaseProvider.createGeometry(stationGeometry),
					positions
				};

				await this.databaseProvider.createStation(station);
			}
		} catch (error) {
			this.logger.error('Scheduled database update failed', error);
		} finally {
			this.logger.log('Scheduled database update finished');
		}
	}

	@Timeout(0)
	atStart() {
		this.updateDatabase();
	}

	@Cron('0 3 * * *')
	daily() {
		this.updateDatabase();
	}
}
