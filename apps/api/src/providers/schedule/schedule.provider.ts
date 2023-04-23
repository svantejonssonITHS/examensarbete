// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';

// Internal dependencies
import { DatabaseProvider } from '../database/database.provider';
import { SLProvider } from '../sl/sl.provider';

@Injectable()
export class ScheduleProvider {
	constructor(private databaseProvider: DatabaseProvider, private slProvider: SLProvider) {}

	private readonly logger = new Logger(ScheduleProvider.name);

	async updateDatabase() {
		this.logger.log('Scheduled update of database started');

		try {
			const sites = await this.slProvider.getSites();
			const stopAreas = await this.slProvider.getStopAreas();

			for (const site of sites) {
				const coordinatesOfSite = stopAreas.find((stopArea) => stopArea.StopAreaNumber === site.StopAreaNumber);

				if (!coordinatesOfSite) continue;

				this.databaseProvider.upsertStation({
					slId: site.SiteId,
					name: site.SiteName,
					northingCoordinate: coordinatesOfSite.CentroidNorthingCoordinate,
					eastingCoordinate: coordinatesOfSite.CentroidEastingCoordinate
				});
			}

			/* 
			for (const stopArea of stopAreas) {
				stationSLIds.push(stopArea.gid);

				const station = await this.databaseProvider.upsertStation({
					slId: stopArea.gid,
					name: stopArea.name,
					shortName: stopArea.shortName || null,
					abbreviation: stopArea.abbreviation || null
				});

				if (!station?.id) continue;

				await this.databaseProvider.upsertGeometry({
					longitude: stopArea.geometry.eastingCoordinate,
					latitude: stopArea.geometry.northingCoordinate,
					stationId: station.id,
					srid: stopArea.geometry.srid
				});

				for (const stopPoint of stopArea.stopPoints) {
					positionSLIds.push(stopPoint.gid);

					const position = await this.databaseProvider.upsertPosition({
						slId: stopPoint.gid,
						name: stopPoint.name,
						shortName: stopPoint.shortName || null,
						abbreviation: stopPoint.abbreviation || null,
						designation: stopPoint.designation,
						stationId: station.id
					});

					if (!position?.id) continue;

					await this.databaseProvider.upsertGeometry({
						longitude: stopPoint.geometry.eastingCoordinate,
						latitude: stopPoint.geometry.northingCoordinate,
						positionId: position.id,
						srid: stopPoint.geometry.srid
					});
				}
			}

			await this.databaseProvider.deleteStationsNotInSL(stationSLIds);
			await this.databaseProvider.deletePositionsNotInSL(positionSLIds); */
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
