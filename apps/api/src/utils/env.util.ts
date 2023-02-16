import { config } from 'dotenv';
config({
	path: '../../.env'
});

export default {
	DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
	DATABASE_PORT: Number(process.env.DATABASE_PORT) || 3306,
	DATABASE_NAME: process.env.DATABASE_NAME,
	DATABASE_USERNAME: process.env.DATABASE_USERNAME,
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
	DATABASE_SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE.toLocaleLowerCase() === 'true'
};
