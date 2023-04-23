import { IsString } from 'class-validator';

export class GetDeparturesRequest {
	@IsString()
	slId?: string;
}
