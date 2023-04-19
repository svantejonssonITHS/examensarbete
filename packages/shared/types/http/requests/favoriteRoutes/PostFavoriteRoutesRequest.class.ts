import { IsInt, IsOptional, IsString } from 'class-validator';

export class PostFavoriteRoutesRequest {
	/**
	 * @description The auth0Id of the user. Is automatically set by the auth guard if the user is authenticated.
	 */
	@IsString()
	@IsOptional()
	readonly auth0Id?: string;

	@IsInt()
	originStationId?: number;

	@IsInt()
	destinationStationId?: number;
}
