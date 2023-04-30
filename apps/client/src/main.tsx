// External dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

// Internal dependencies
import App from './App';
import './css/index.css';
import { ThemeProvider } from './providers/Theme.provider';
import '$src/i18n/index';
import env from './utils/env.util';
import { MapMarkerProvider } from './providers/MapMarker.provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Auth0Provider
			domain={env.AUTH0_DOMAIN}
			clientId={env.AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: window.location.origin
			}}
			cacheLocation="localstorage"
		>
			<ThemeProvider>
				<MapMarkerProvider>
					<App />
				</MapMarkerProvider>
			</ThemeProvider>
		</Auth0Provider>
	</React.StrictMode>
);
