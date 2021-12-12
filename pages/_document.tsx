// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, {
  Html,
  DocumentContext,
  Head,
  Main,
  NextScript,
} from 'next/document'

import React from 'react'

React.useLayoutEffect = React.useEffect

class MainDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MainDocument
