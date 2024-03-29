import { Html, Head, Main, NextScript } from 'next/document';
import { getInitColorSchemeScript } from '@mui/material/styles';

export default function Document() {
  return (
    <Html lang="en" >
      <Head>
      </Head>
      <body >
        {getInitColorSchemeScript()}
        <Main  />
        <NextScript />
      </body>
    </Html>
  )
}
