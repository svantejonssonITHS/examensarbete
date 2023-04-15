export type HttpResponse<T> = {
	success: boolean;
	message: string;
} & T;
