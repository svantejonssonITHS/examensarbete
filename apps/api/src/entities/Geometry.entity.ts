import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Geometry {
	@PrimaryGeneratedColumn()
	readonly id?: number;

	@Column()
	longitude: number;

	@Column()
	latitude: number;

	@Column({ default: 4326 })
	srid?: number;
}