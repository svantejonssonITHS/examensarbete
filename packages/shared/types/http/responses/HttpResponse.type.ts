export type HttpResponse<T = object> = {
	success: boolean;
	message: string;
} & T;
