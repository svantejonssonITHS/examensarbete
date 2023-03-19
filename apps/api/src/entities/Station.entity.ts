// External dependencies
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';

// Internal dependencies
import { Geometry } from './Geometry.entity';
import { Position } from './Position.entity';

@Entity()
export class Station {
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

	@OneToOne(() => Geometry, (geometry) => geometry.id)
	@JoinColumn()
	geometry?: Geometry;

	@OneToMany(() => Position, (position) => position.station, { cascade: true })
	positions?: Position[];
}
