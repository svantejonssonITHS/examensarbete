// External dependencies
import { InferAttributes, Optional } from 'sequelize';
import { Column, HasOne, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { Position } from './Position.model';
import { Station } from './Station.model';

@Table({ timestamps: false })
export class Geometry extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ type: 'DECIMAL(18,15)' })
	longitude: number;

	@Column({ type: 'DECIMAL(18,15)' })
	latitude: number;

	@Column({ defaultValue: 4326 })
	srid: number;

	@HasOne(() => Position, { foreignKey: 'geometryId' })
	position: Position | number;

	@HasOne(() => Station, { foreignKey: 'geometryId' })
	station: Station | number;
}

export type GeometryAttributes = InferAttributes<Geometry>;
export type GeometryCreationAttributes = Optional<
	GeometryAttributes & { positionId?: number; stationId?: number },
	'id' | 'srid' | 'position' | 'station'
>;
