// pages/_app.tsx
import type { AppProps } from 'next/app';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '@/authConfig';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, } from '@mui/material/styles';
import SidebarLayout from '@/layouts/sidebarLayout';
import TopbarLayout from '@/layouts/topbarLayout';
import { theme } from '@/theme';
import '@/styles/globals.css';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Roboto, Space_Mono } from 'next/font/google';
import { SWRConfig } from 'swr';

const msalInstance = new PublicClientApplication(msalConfig);

const spaceMono = Space_Mono({
  weight: '400',
  subsets: ['latin'],
  style: 'italic'
})

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  style: 'normal'
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <MsalProvider instance={msalInstance}>
        <SWRConfig value={{
          refreshInterval: 300000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}>
          <main className={`${roboto.className} ${spaceMono.className}`}>
            <TopbarLayout >
              <Component {...pageProps} />
            </TopbarLayout>
          </main>
        </SWRConfig>
      </MsalProvider>
    </CssVarsProvider >
  );
}

export default MyApp;
