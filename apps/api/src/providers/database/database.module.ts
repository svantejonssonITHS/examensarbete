// External dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal dependencies
import { Geometry, Position, Station } from '$src/entities';
import { DatabaseProvider } from './database.provider';

@Module({
	imports: [TypeOrmModule.forFeature([Geometry, Position, Station])],
	providers: [DatabaseProvider],
	exports: [DatabaseProvider]
})
export class DatabaseModule {}
