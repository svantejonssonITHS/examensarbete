// External dependencies
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

// Internal dependencies
import { Geometry } from './Geometry.entity';

@Entity()
export class Position {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	vasttrafikId: string;

	@Column()
	name: string;

	@Column()
	shortName: string;

	@Column()
	designation: string;

	@OneToOne(() => Geometry, (geometry) => geometry.id)
	geometry: Geometry;
}
