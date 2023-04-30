// External dependencies
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';

// Internal dependencies
import { DatabaseProvider } from '../database/database.provider';
import { SlProvider } from '../sl/sl.provider';

@Injectable()
export class ScheduleProvider {
	constructor(private databaseProvider: DatabaseProvider, private slProvider: SlProvider) {}

	private readonly logger = new Logger(ScheduleProvider.name);

	async updateDatabase() {
		this.logger.log('Scheduled update of database started');

		try {
			const sites = await this.slProvider.getSites();
			const stopAreas = await this.slProvider.getStopAreas();

			const stationSlIds = [];

			for (const site of sites) {
				stationSlIds.push(site.SiteId);

				const coordinatesOfSite = stopAreas.find((stopArea) => stopArea.StopAreaNumber === site.StopAreaNumber);

				if (!coordinatesOfSite) continue;

				this.databaseProvider.upsertStation({
					slId: site.SiteId,
					name: site.SiteName,
					northingCoordinate: coordinatesOfSite.CentroidNorthingCoordinate,
					eastingCoordinate: coordinatesOfSite.CentroidEastingCoordinate
				});
			}

			await this.databaseProvider.deleteStationsNotInSl(stationSlIds);
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
