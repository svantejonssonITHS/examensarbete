import { IsString } from 'class-validator';

export class GetFavoriteStationsRequest {
	/**
	 * @description The auth0Id of the user. Is automatically set by the auth guard if the user is authenticated.
	 */
	@IsString()
	readonly auth0Id?: string;
}
