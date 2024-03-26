// pages/_app.tsx
import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import TopbarLayout from '@/layouts/TopbarLayout';
import { theme } from '@/theme';
import '@/styles/globals.css';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Roboto, Space_Mono } from 'next/font/google';
import { SWRConfig } from 'swr';

const spaceMono = Space_Mono({
	weight: '400',
	subsets: ['latin'],
	style: 'italic',
});

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
	style: 'normal',
});

function localStorageProvider(): Map<any, any> {
	// When initializing, we restore the data from `localStorage` into a map.
	const map = new Map<any, any>(
		JSON.parse(localStorage.getItem('app-cache') || '[]'),
	);

	// Before unloading the app, we write back all the data into `localStorage`.
	window.addEventListener('beforeunload', () => {
		const appCache = JSON.stringify(Array.from(map.entries()));
		localStorage.setItem('app-cache', appCache);
	});

	// We still use the map for write & read for performance.
	return map;
}

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<CssVarsProvider theme={theme}>
			<CssBaseline />
			<SWRConfig
				value={{
					refreshInterval: 300000,
					fetcher: (resource, init) =>
						fetch(resource, init).then((res) => res.json()),
				}}
			>
				<main className={`${roboto.className} ${spaceMono.className}`}>
					<TopbarLayout>
						<Component {...pageProps} />
					</TopbarLayout>
				</main>
			</SWRConfig>
		</CssVarsProvider>
	);
}

export default MyApp;
