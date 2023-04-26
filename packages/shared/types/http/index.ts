// Response types
export type { HttpResponse } from './responses/HttpResponse.type';
export type { GetDeparturesResponse } from './responses/departures/GetDeparturesResponse.type';
export type { GetFavoriteRoutesResponse } from './responses/favoriteRoutes/GetFavoriteRoutesResponse.type';
export type { PostFavoriteRoutesResponse } from './responses/favoriteRoutes/PostFavoriteRoutesResponse.type';
export type { GetFavoriteStationsResponse } from './responses/favoriteStations/GetFavoriteStationsResponse.type';
export type { PostFavoriteStationsResponse } from './responses/favoriteStations/PostFavoriteStationsResponse.type';
export type { GetHealthResponse } from './responses/health/GetHealthResponse.type';
export type { GetJourneysResponse } from './responses/journeys/GetJourneysResponse.type';
export type { GetStationsResponse } from './responses/stations/GetStationsResponse.type';

// Request types
export { GetDeparturesRequest } from './requests/departures/GetDeparturesRequest.class';
export { GetFavoriteRoutesRequest } from './requests/favoriteRoutes/GetFavoriteRoutesRequest.class';
export { PostFavoriteRoutesRequest } from './requests/favoriteRoutes/PostFavoriteRoutesRequest.class';
export { DeleteFavoriteRoutesRequest } from './requests/favoriteRoutes/DeleteFavoriteRoutesRequest.class';
export { GetFavoriteStationsRequest } from './requests/favoriteStations/GetFavoriteStationsRequest.class';
export { PostFavoriteStationsRequest } from './requests/favoriteStations/PostFavoriteStationsRequest.class';
export { DeleteFavoriteStationsRequest } from './requests/favoriteStations/DeleteFavoriteStationsRequest.class';
export { GetJourneysRequest } from './requests/journeys/GetJourneysRequest.class';
export { GetStationsRequest } from './requests/stations/GetStationsRequest.class';
