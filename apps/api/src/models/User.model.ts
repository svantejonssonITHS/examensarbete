// External dependencies
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { FavoriteRoute, FavoriteStation, User } from '_packages/shared/types/models';
import { FavoriteRouteModel } from './FavoriteRoute.model';
import { FavoriteStationModel } from './FavoriteStation.model';
import { TableName } from '$src/enums/TableName.enum';

@Table({ timestamps: false, tableName: TableName.USERS })
export class UserModel extends Model implements User {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ unique: true })
	auth0Id: string;

	@HasMany(() => FavoriteRouteModel, { foreignKey: 'userId' })
	favoriteRoutes: FavoriteRoute[];

	@HasMany(() => FavoriteStationModel, { foreignKey: 'userId' })
	favoriteStations: FavoriteStation[];
}
