import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class Doc extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="sv">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />

          <title>Bryggan – Sjöfartstidningen</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="preload" href="/static/assets/css/main.css" as="style" />
          <link rel="stylesheet" href="/static/assets/css/main.css" />

          {this.props.styleTags}
        </Head>
        <body>
          <div id="preview-root" style={{ position: 'relative', zIndex: 1 }} />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
