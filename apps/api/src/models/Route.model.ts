// External dependencies
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { Route, Station, User } from '_packages/shared/types/models';
import { StationModel } from './Station.model';
import { UserModel } from './User.model';
import { TableName } from '$src/enums/tableName.enum';

@Table({ timestamps: false, tableName: TableName.ROUTES })
export class RouteModel extends Model implements Route {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@BelongsTo(() => UserModel, { foreignKey: 'userId' })
	user: User | number;

	@BelongsTo(() => StationModel, { foreignKey: 'originStationId' })
	originStation: Station | number;

	@BelongsTo(() => StationModel, { foreignKey: 'destinationStationId' })
	destinationStation: Station | number;
}
