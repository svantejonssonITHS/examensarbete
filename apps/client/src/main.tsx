import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/index.css';
import { ThemeProvider } from './providers/Theme.provider';
import '$src/i18n/index';
import { Auth0Provider } from '@auth0/auth0-react';
import env from './utils/env.util';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Auth0Provider
			domain={env.AUTH0_DOMAIN}
			clientId={env.AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: env.AUTH0_REDIRECT_URI
			}}
			cacheLocation="localstorage"
		>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</Auth0Provider>
	</React.StrictMode>
);
