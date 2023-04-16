// External dependencies
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { FavoriteStation, Station, User } from '_packages/shared/types/models';
import { StationModel } from './Station.model';
import { UserModel } from './User.model';
import { TableName } from '$src/enums/tableName.enum';

@Table({ timestamps: false, tableName: TableName.FAVORITE_STATIONS })
export class FavoriteStationModel extends Model implements FavoriteStation {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@BelongsTo(() => UserModel, { foreignKey: 'userId' })
	user: User | number;

	@BelongsTo(() => StationModel, { foreignKey: 'stationId' })
	station: Station | number;
}
