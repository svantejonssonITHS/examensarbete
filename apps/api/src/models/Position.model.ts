// External dependencies
import { InferAttributes, Optional } from 'sequelize';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { Geometry } from './Geometry.model';
import { Station } from './Station.model';

@Table({ timestamps: false })
export class Position extends Model {
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

	@Column
	designation: string;

	@BelongsTo(() => Geometry, { foreignKey: 'geometryId' })
	geometry: InferAttributes<Geometry>;

	@BelongsTo(() => Station, { foreignKey: 'stationId' })
	station: InferAttributes<Station>;
}

export type PositionAttributes = InferAttributes<Position>;
export type PositionCreationAttributes = Optional<
	PositionAttributes & { geometryId: number; stationId: number },
	'id' | 'geometry' | 'station'
>;
