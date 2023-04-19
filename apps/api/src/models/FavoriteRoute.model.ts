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

	@BelongsTo(() => UserModel, { foreignKey: { name: 'userId', allowNull: false }, onDelete: 'CASCADE', hooks: true })
	user: User | number;

	@BelongsTo(() => StationModel, {
		foreignKey: { name: 'originStationId', allowNull: false },
		onDelete: 'CASCADE',
		hooks: true
	})
	originStation: Station | number;

	@BelongsTo(() => StationModel, {
		foreignKey: { name: 'destinationStationId', allowNull: false },
		onDelete: 'CASCADE',
		hooks: true
	})
	destinationStation: Station | number;
}
