import { GeometryCreationAttributes } from '$src/models/Geometry.model';
import { PositionCreationAttributes } from '$src/models/Position.model';
import { StationCreationAttributes } from '$src/models/Station.model';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import { DatabaseProvider } from '../database/database.provider';
import { VasttrafikProvider } from '../vasttrafik/vasttrafik.provider';

@Injectable()
export class ScheduleProvider {
	constructor(private databaseProvider: DatabaseProvider, private vasttrafikProvider: VasttrafikProvider) {}

	private readonly logger = new Logger(ScheduleProvider.name);

	async updateDatabase() {
		// TODO: If vastrafikId already exists, update instead of create. If id in database but not in response, delete it from db. Try bulkInsert instead of create. Clean up function.
		/*
		1. Get all stop areas
		2. For each stop area, create station (if not exists)
		3. For each stop area, create geometry (if not exists)
		4. For each stop area, get all stop points
		5. For each stop point, create position (if not exists)
		6. For each stop point, create geometry (if not exists)
		7. If any ids in database but not in response, delete them from db
		*/
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

			// TODO: Delete stations and positions that are not in the response from Västtrafik
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
