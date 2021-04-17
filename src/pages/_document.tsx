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
        lang={'en'}
        style={{
          height: '100%',
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
