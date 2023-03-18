import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Geometry {
	@PrimaryGeneratedColumn()
	readonly id?: number;

	@Column({ type: 'decimal', precision: 18, scale: 15 })
	longitude: number;

	@Column({ type: 'decimal', precision: 18, scale: 15 })
	latitude: number;

	@Column({ default: 4326 })
	srid?: number;
}
