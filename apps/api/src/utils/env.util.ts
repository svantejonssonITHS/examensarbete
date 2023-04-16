import { config } from 'dotenv';
config({
	path: './.env'
});

export default {
	AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
	DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
	DATABASE_PORT: Number(process.env.DATABASE_PORT) || 3306,
	DATABASE_NAME: process.env.DATABASE_NAME,
	DATABASE_USERNAME: process.env.DATABASE_USERNAME,
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
	DATABASE_SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE.toLocaleLowerCase() === 'true',
	VASTTRAFIK_API_KEY: process.env.VASTTRAFIK_API_KEY
};
