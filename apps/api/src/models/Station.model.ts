// External dependencies
import { HasOne, Column, HasMany, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { Geometry, Position, Route, Station } from '_packages/shared/types/models';
import { GeometryModel } from './Geometry.model';
import { PositionModel } from './Position.model';
import { RouteModel } from './Route.model';
import { TableName } from '$src/enums/tableName.enum';

@Table({ timestamps: false, tableName: TableName.STATIONS })
export class StationModel extends Model implements Station {
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

	@HasOne(() => GeometryModel, { foreignKey: 'stationId', onDelete: 'CASCADE', hooks: true })
	geometry: Geometry;

	@HasMany(() => PositionModel, { foreignKey: 'stationId', onDelete: 'CASCADE', hooks: true })
	positions: Position[];

	@HasMany(() => RouteModel, { foreignKey: 'originStationId', onDelete: 'CASCADE', hooks: true })
	routesWhereOrigin: Route[];

	@HasMany(() => RouteModel, { foreignKey: 'destinationStationId', onDelete: 'CASCADE', hooks: true })
	routesWhereDestination: Route[];
}
