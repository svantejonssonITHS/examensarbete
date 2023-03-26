// External dependencies
import { InferAttributes, Optional } from 'sequelize';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { Station } from './Station.model';
import { User } from './User.model';

@Table({ timestamps: false })
export class Route extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@BelongsTo(() => User, { foreignKey: 'userId' })
	user: User;

	@BelongsTo(() => Station, { foreignKey: 'originStationId' })
	originStation: string;

	@BelongsTo(() => Station, { foreignKey: 'destinationStationId' })
	destinationStation: string;

	@BelongsTo(() => Station, { foreignKey: 'viaStationId' })
	viaStation: string;

	// TODO: Add more columns, see api docs: https://developer.vasttrafik.se/portal/#/api/Reseplaneraren/v2/landerss
}

export type RouteAttributes = InferAttributes<Route>;

export type RouteCreationAttributes = Optional<RouteAttributes, 'id' | 'originStation' | 'viaStation'>;
