// External dependencies
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { Route, User } from '_packages/shared/types/models';
import { RouteModel } from './Route.model';
import { TableName } from '$src/enums/tableName.enum';

@Table({ timestamps: false, tableName: TableName.USERS })
export class UserModel extends Model implements User {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ unique: true })
	auth0Id: string;

	@HasMany(() => RouteModel, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
	routes: Route[];
}
