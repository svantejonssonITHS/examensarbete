// External dependencies
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { Geometry, Position, Station } from '_packages/shared/types/models';
import { PositionModel } from './Position.model';
import { StationModel } from './Station.model';
import { TableName } from '$src/enums/tableName.enum';

@Table({ timestamps: false, tableName: TableName.GEOMETRIES })
export class GeometryModel extends Model implements Geometry {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ type: 'DECIMAL(18,15)' })
	longitude: number;

	@Column({ type: 'DECIMAL(18,15)' })
	latitude: number;

	@Column({ defaultValue: 4326 })
	srid: number;

	@BelongsTo(() => PositionModel, { foreignKey: 'positionId', onDelete: 'CASCADE', hooks: true })
	position: Position | number;

	@BelongsTo(() => StationModel, { foreignKey: 'stationId', onDelete: 'CASCADE', hooks: true })
	station: Station | number;
}

// TODO: Add a hook to verify that either positionId or stationId is set but not both
