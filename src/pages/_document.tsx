import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html
        style={{
          height: '100%',
          scrollBehavior: 'smooth',
        }}
      >
        <Head />
        <body
          style={{
            height: '100%',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
