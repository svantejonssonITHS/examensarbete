// External dependencies
import { InferAttributes, Optional } from 'sequelize';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';

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

	@BelongsTo(() => Position, { foreignKey: 'positionId' })
	position: Position | number;

	@BelongsTo(() => Station, { foreignKey: 'stationId' })
	station: Station | number;
}

export type GeometryAttributes = InferAttributes<Geometry>;

type GeometryCreationAttributesBase = Optional<GeometryAttributes, 'id' | 'srid' | 'position' | 'station'>;

interface GeometryForPositionCreationAttributes extends GeometryCreationAttributesBase {
	positionId: number;
}

interface GeometryForStationCreationAttributes extends GeometryCreationAttributesBase {
	stationId: number;
}

/**
 * @description Either a positionId or a stationId is required.
 */
export type GeometryCreationAttributes = GeometryForPositionCreationAttributes | GeometryForStationCreationAttributes;