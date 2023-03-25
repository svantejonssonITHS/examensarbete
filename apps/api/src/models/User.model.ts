// External dependencies
import { InferAttributes, Optional } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { Route } from './Route.model';

@Table({ timestamps: false })
export class User extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ unique: true })
	auth0Id: string;

	@HasMany(() => Route, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
	routes: InferAttributes<Route>[];
}

export type UserAttributes = InferAttributes<User>;

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'routes'>;
