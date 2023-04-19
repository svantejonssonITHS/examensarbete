// External dependencies
import { HasOne, Column, HasMany, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { FavoriteRoute, FavoriteStation, Geometry, Position, Station } from '_packages/shared/types/models';
import { FavoriteRouteModel } from './FavoriteRoute.model';
import { FavoriteStationModel } from './FavoriteStation.model';
import { GeometryModel } from './Geometry.model';
import { PositionModel } from './Position.model';
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

	@HasOne(() => GeometryModel, { foreignKey: 'stationId' })
	geometry: Geometry;

	@HasMany(() => PositionModel, { foreignKey: 'stationId' })
	positions: Position[];

	@HasMany(() => FavoriteRouteModel, { foreignKey: 'originStationId' })
	favoriteRoutesWhereOrigin: FavoriteRoute[];

	@HasMany(() => FavoriteRouteModel, { foreignKey: 'destinationStationId' })
	favoriteRoutesWhereDestination: FavoriteRoute[];

	@HasMany(() => FavoriteStationModel, { foreignKey: 'stationId' })
	favoriteStationsWhereStation: FavoriteStation[];
}
