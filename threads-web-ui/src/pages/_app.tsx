import { AppProps } from 'next/app';
import React from 'react';
import { GlobalStyle } from '@/components/GlobalStyle';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Component {...pageProps} />

      <div id="portal" />
    </React.Fragment>
  );
}

export default MyApp;
