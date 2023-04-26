import { IsBoolean, IsOptional, IsString, Matches, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetJourneysRequest {
	@IsString()
	originId?: string;

	@IsString()
	destinationId?: string;

	@IsOptional()
	@Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, { message: 'date must be in the format YYYY-MM-DD' })
	date?: string;

	@ValidateIf((o) => o.date)
	@Matches(/^[0-9]{2}:[0-9]{2}$/, { message: 'time must be in the format HH:MM' })
	time?: string;

	@ValidateIf((o) => o.time)
	@Transform((o) => o.value === 'true')
	@IsBoolean()
	isArrivalTime?: boolean;
}
