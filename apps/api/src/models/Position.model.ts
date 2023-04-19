// External dependencies
import { BelongsTo, HasOne, Column, Model, Table } from 'sequelize-typescript';

// Internal dependencies
import { Geometry, Position, Station } from '_packages/shared/types/models';
import { GeometryModel } from './Geometry.model';
import { StationModel } from './Station.model';
import { TableName } from '$src/enums/tableName.enum';

@Table({ timestamps: false, tableName: TableName.POSITIONS })
export class PositionModel extends Model implements Position {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ unique: true })
	vasttrafikId: string;

	@Column
	name: string;

	@Column({ allowNull: true })
	shortName: string | null;

	@Column({ allowNull: true })
	abbreviation: string | null;

	@Column
	designation: string;

	@HasOne(() => GeometryModel, { foreignKey: 'positionId' })
	geometry: Geometry;

	@BelongsTo(() => StationModel, {
		foreignKey: { name: 'stationId', allowNull: false },
		onDelete: 'CASCADE',
		hooks: true
	})
	station: Station | number;
}
