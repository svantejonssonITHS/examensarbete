// External dependencies
import { InferAttributes, Optional } from 'sequelize';
import { HasOne, Column, HasMany, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { Geometry } from './Geometry.model';
import { Position } from './Position.model';
import { Route } from './Route.model';

@Table({ timestamps: false })
export class Station extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ unique: true })
	vasttrafikId: string;

	@Column
	name: string;

	@Column({ allowNull: true })
	shortName: string;

	@Column({ allowNull: true })
	abbreviation: string;

	@HasOne(() => Geometry, { foreignKey: 'stationId', onDelete: 'CASCADE', hooks: true })
	geometry?: InferAttributes<Geometry>;

	@HasMany(() => Position, { foreignKey: 'stationId', onDelete: 'CASCADE', hooks: true })
	positions?: InferAttributes<Position>[];

	@HasMany(() => Route, { foreignKey: 'originStationId', onDelete: 'CASCADE', hooks: true })
	routesWhereOrigin?: InferAttributes<Route>[];

	@HasMany(() => Route, { foreignKey: 'destinationStationId', onDelete: 'CASCADE', hooks: true })
	routesWhereDestination?: InferAttributes<Route>[];
}

export type StationAttributes = InferAttributes<Station>;
export type StationCreationAttributes = Optional<
	StationAttributes,
	'id' | 'geometry' | 'positions' | 'routesWhereOrigin' | 'routesWhereDestination'
>;
