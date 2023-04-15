import { Route } from './Route.type';

export type User = {
	id: number;
	auth0Id: string;
	routes: Route[];
};

export type UserCreationAttributes = Omit<User, 'id' | 'routes'>;
