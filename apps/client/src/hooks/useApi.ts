// External dependencies
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

// Internal dependencies
import { ApiResponse } from '$src/types/apiResponse.type';
import env from '$src/utils/env.util';

function useApi<Req, Res>(method: RequestInit['method'], path: string, body?: Req, queries?: Req): ApiResponse<Res> {
	const [data, setData] = useState<Res>({} as Res);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const { getAccessTokenSilently } = useAuth0();

	const controller = new AbortController();

	useEffect(() => {
		(async () => {
			const token = await getAccessTokenSilently();

			const config: RequestInit = {
				method,
				signal: controller.signal,
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			};

			if (body) {
				config.body = JSON.stringify(body);
			} else if (queries) {
				const query = new URLSearchParams(queries as Record<string, string>).toString();
				path = `${path}?${query}`;
			}

			try {
				setLoading(true);
				const response = await fetch(`${env.API_URL}/${path}`, config);

				if (!response.ok) {
					throw new Error(response.statusText);
				}

				const result: Res = await response.json();

				setData(result);
			} catch (e) {
				setError(e as Error);
			} finally {
				setLoading(false);
			}
		})();

		return () => controller.abort();
	}, [getAccessTokenSilently, method, path, body, queries]);

	return { error, loading, ...data };
}

export default useApi;
