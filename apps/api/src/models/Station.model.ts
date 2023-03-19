// External dependencies
import { InferAttributes, Optional } from 'sequelize';
import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { Geometry } from './Geometry.model';
import { Position } from './Position.model';

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

	@BelongsTo(() => Geometry, { foreignKey: 'geometryId' })
	geometry: InferAttributes<Geometry>;

	@HasMany(() => Position, { foreignKey: 'stationId' })
	positions: InferAttributes<Position>[];
}

export type StationAttributes = InferAttributes<Station>;
export type StationCreationAttributes = Optional<
	StationAttributes & { geometryId: number },
	'id' | 'positions' | 'geometry'
>;
