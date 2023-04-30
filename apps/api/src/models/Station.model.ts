// External dependencies
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { FavoriteRoute, FavoriteStation, Station } from '_packages/shared/types/models';
import { FavoriteRouteModel } from './FavoriteRoute.model';
import { FavoriteStationModel } from './FavoriteStation.model';
import { TableName } from '$src/enums/TableName.enum';

@Table({ timestamps: false, tableName: TableName.STATIONS })
export class StationModel extends Model implements Station {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ unique: true })
	slId: string;

	@Column
	name: string;

	@Column({ type: 'DECIMAL(18,15)' })
	northingCoordinate: number;

	@Column({ type: 'DECIMAL(18,15)' })
	eastingCoordinate: number;

	@HasMany(() => FavoriteRouteModel, { foreignKey: 'originStationId' })
	favoriteRoutesWhereOrigin: FavoriteRoute[];

	@HasMany(() => FavoriteRouteModel, { foreignKey: 'destinationStationId' })
	favoriteRoutesWhereDestination: FavoriteRoute[];

	@HasMany(() => FavoriteStationModel, { foreignKey: 'stationId' })
	favoriteStationsWhereStation: FavoriteStation[];
}
