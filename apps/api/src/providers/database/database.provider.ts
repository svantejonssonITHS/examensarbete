// External dependencies
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal dependencies
import { Geometry, Position, Station } from '$src/entities';

@Injectable()
export class DatabaseProvider {
	constructor(
		@InjectRepository(Geometry)
		private geometryRepository: Repository<Geometry>,
		@InjectRepository(Position)
		private positionRepository: Repository<Position>,
		@InjectRepository(Station)
		private stationRepository: Repository<Station>
	) {}

	public createGeometry = async (geometry: Geometry): Promise<Geometry> => {
		return this.geometryRepository.save(geometry);
	};

	public createPosition = async (position: Position): Promise<Position> => {
		return this.positionRepository.save(position);
	};

	public createStation = async (station: Station): Promise<Station> => {
		return this.stationRepository.save(station);
	};
}
