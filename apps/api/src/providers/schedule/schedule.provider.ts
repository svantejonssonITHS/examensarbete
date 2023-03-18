import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry, Timeout } from '@nestjs/schedule';

@Injectable()
export class ScheduleProvider {
	constructor(private schedulerRegistry: SchedulerRegistry) {}
	private readonly logger = new Logger(ScheduleProvider.name);

	test() {
		this.logger.debug('Task run successfully');
	}

	@Timeout(5000)
	handleCron() {
		this.test();
	}

	@Cron('45 * * * * *')
	handleCron2() {
		this.test();
	}
}
