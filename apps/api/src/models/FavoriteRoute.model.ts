// External dependencies
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { FavoriteRoute, Station, User } from '_packages/shared/types/models';
import { StationModel } from './Station.model';
import { UserModel } from './User.model';
import { TableName } from '$src/enums/tableName.enum';

@Table({ timestamps: false, tableName: TableName.FAVORITE_ROUTES })
export class FavoriteRouteModel extends Model implements FavoriteRoute {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@BelongsTo(() => UserModel, { foreignKey: 'userId' })
	user: User | number;

	@BelongsTo(() => StationModel, { foreignKey: 'originStationId' })
	originStation: Station | number;

	@BelongsTo(() => StationModel, { foreignKey: 'destinationStationId' })
	destinationStation: Station | number;
}
