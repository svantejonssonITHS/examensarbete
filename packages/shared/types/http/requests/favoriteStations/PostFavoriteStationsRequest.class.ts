import { IsInt, IsOptional, IsString } from 'class-validator';

export class PostFavoriteStationsRequest {
	/**
	 * @description The auth0Id of the user. Is automatically set by the auth guard if the user is authenticated.
	 */
	@IsString()
	@IsOptional()
	readonly auth0Id?: string;

	@IsInt()
	stationId?: number;
}
