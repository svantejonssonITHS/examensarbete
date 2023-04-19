import { IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteFavoriteRoutesRequest {
	/**
	 * @description The auth0Id of the user. Is automatically set by the auth guard if the user is authenticated.
	 */
	@IsString()
	@IsOptional()
	readonly auth0Id?: string;

	@IsInt()
	@Transform(({ value }) => parseInt(value))
	id?: number;
}
