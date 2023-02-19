// External dependencies
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';

// Internal dependencies
import { Geometry } from './Geometry.entity';
import { Position } from './Position.entity';

@Entity()
export class Station {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	vasttrafikId: string;

	@Column()
	name: string;

	@Column()
	shortName: string;

	@OneToOne(() => Geometry, (geometry) => geometry.id)
	geometry: Geometry;

	@OneToMany(() => Position, (position) => position.id)
	positions: Position[];
}
