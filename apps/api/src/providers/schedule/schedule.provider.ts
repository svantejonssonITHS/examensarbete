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
		// TODO: If vastrafikId already exists, update instead of create. Try bulkInsert instead of create. Clean up function.
		this.logger.log('Scheduled update of database started');

		try {
			const stopAreas = await this.vasttrafikProvider.getStopAreas();

			for (const stopArea of stopAreas) {
				const stationGeometry: GeometryCreationAttributes = {
					longitude: stopArea.geometry.eastingCoordinate,
					latitude: stopArea.geometry.northingCoordinate
				};

				const station: StationCreationAttributes = {
					vasttrafikId: stopArea.gid,
					name: stopArea.name,
					shortName: stopArea.shortName,
					abbreviation: stopArea.abbreviation,
					geometryId: (await this.databaseProvider.createGeometry(stationGeometry)).id
				};

				const createdStation = await this.databaseProvider.createStation(station);

				for (const stopPoint of stopArea.stopPoints) {
					const positionGeometry: GeometryCreationAttributes = {
						longitude: stopPoint.geometry.eastingCoordinate,
						latitude: stopPoint.geometry.northingCoordinate
					};

					const position: PositionCreationAttributes = {
						vasttrafikId: stopPoint.gid,
						name: stopPoint.name,
						shortName: stopPoint.shortName,
						abbreviation: stopPoint.abbreviation,
						designation: stopPoint.designation,
						geometryId: (await this.databaseProvider.createGeometry(positionGeometry)).id,
						stationId: createdStation.id
					};

					await this.databaseProvider.createPosition(position);
				}
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
