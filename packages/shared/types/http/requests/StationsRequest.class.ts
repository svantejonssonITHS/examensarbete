import { IsString } from 'class-validator';

export class StationsRequest {
	@IsString()
	readonly name?: string;
}
