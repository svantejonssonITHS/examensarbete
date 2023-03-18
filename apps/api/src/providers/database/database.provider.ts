// External dependencies
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

// Internal dependencies
import { Geometry, Position, Station } from '$src/entities';

@Injectable()
export class DatabaseProvider {
	constructor(private dataSource: DataSource) {}

	private queryManager = async (queries: (entityManager: EntityManager) => Promise<unknown>) => {
		let result = null;

		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			result = await queries(queryRunner.manager);

			await queryRunner.commitTransaction();
		} catch (error) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}

		return result;
	};

	public createGeometry = async (geometry: Geometry): Promise<Geometry> => {
		return this.queryManager(async (entityManager) => {
			return await entityManager.save(Geometry, geometry);
		});
	};

	public createPosition = async (position: Position): Promise<Position> => {
		return this.queryManager(async (entityManager) => {
			return await entityManager.save(Position, position);
		});
	};

	public createStation = async (station: Station): Promise<Station> => {
		return this.queryManager(async (entityManager) => {
			return await entityManager.save(Station, station);
		});
	};
}