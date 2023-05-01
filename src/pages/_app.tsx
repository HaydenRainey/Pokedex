// pages/_app.tsx
import type { AppProps } from 'next/app';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '@/authConfig';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, } from '@mui/material/styles';
import TopbarLayout from '@/layouts/topbarLayout';
import { theme } from '@/theme';
import '@/styles/globals.css';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Inter } from 'next/font/google';
import { Roboto } from 'next/font/google';

const msalInstance = new PublicClientApplication(msalConfig);
const inter = Inter({ subsets: ['latin'] });


const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <MsalProvider instance={msalInstance}>
        <main className={roboto.className}>
          <TopbarLayout >
            <Component {...pageProps} />
          </TopbarLayout>
        </main>
      </MsalProvider>
    </CssVarsProvider >
  );
}

export default MyApp;
