// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';

// Internal dependencies
import { DatabaseProvider } from '../database/database.provider';
import { VasttrafikProvider } from '../vasttrafik/vasttrafik.provider';

@Injectable()
export class ScheduleProvider {
	constructor(private databaseProvider: DatabaseProvider, private vasttrafikProvider: VasttrafikProvider) {}

	private readonly logger = new Logger(ScheduleProvider.name);

	async updateDatabase() {
		this.logger.log('Scheduled update of database started');

		try {
			const stopAreas = await this.vasttrafikProvider.getStopAreas();

			const stationVasttrafikIds = [];
			const positionVasttrafikIds = [];

			for (const stopArea of stopAreas) {
				stationVasttrafikIds.push(stopArea.gid);

				const station = await this.databaseProvider.upsertStation({
					vasttrafikId: stopArea.gid,
					name: stopArea.name,
					shortName: stopArea.shortName,
					abbreviation: stopArea.abbreviation
				});

				await this.databaseProvider.upsertGeometry({
					longitude: stopArea.geometry.eastingCoordinate,
					latitude: stopArea.geometry.northingCoordinate,
					stationId: station.id
				});

				for (const stopPoint of stopArea.stopPoints) {
					positionVasttrafikIds.push(stopPoint.gid);

					const position = await this.databaseProvider.upsertPosition({
						vasttrafikId: stopPoint.gid,
						name: stopPoint.name,
						shortName: stopPoint.shortName,
						abbreviation: stopPoint.abbreviation,
						designation: stopPoint.designation,
						stationId: station.id
					});

					await this.databaseProvider.upsertGeometry({
						longitude: stopPoint.geometry.eastingCoordinate,
						latitude: stopPoint.geometry.northingCoordinate,
						positionId: position.id
					});
				}
			}

			await this.databaseProvider.deleteStationsNotInVasttrafik(stationVasttrafikIds);
			await this.databaseProvider.deletePositionsNotInVasttrafik(positionVasttrafikIds);
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
