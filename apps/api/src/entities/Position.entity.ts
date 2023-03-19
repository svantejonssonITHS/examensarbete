// External dependencies
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

// Internal dependencies
import { Geometry } from './Geometry.entity';
import { Station } from './Station.entity';

@Entity()
export class Position {
	@PrimaryGeneratedColumn()
	readonly id?: number;

	@Column({ unique: true })
	vasttrafikId: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	shortName: string;

	@Column({ nullable: true })
	abbreviation: string;

	@Column()
	designation: string;

	@OneToOne(() => Geometry, (geometry) => geometry.id)
	@JoinColumn()
	geometry?: Geometry;

	@ManyToOne(() => Station, (station) => station.positions)
	station?: Station;
}
