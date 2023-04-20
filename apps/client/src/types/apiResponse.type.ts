export type ApiResponse<T = object> = {
	loading: boolean;
	error: Error | null;
} & T;
