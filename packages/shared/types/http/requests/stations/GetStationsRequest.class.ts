import { IsString } from 'class-validator';

export class GetStationsRequest {
	@IsString()
	readonly name?: string;
}
