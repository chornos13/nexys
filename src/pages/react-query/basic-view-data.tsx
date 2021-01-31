import BasicViewData from 'views/Home/BasicViewData/BasicViewData'
import fs from 'fs'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import React from 'react'
import Content from 'components/Content/Content'
import Text from 'components/Typography/Text'
import CopyOutlined from '@ant-design/icons/CopyOutlined'

// This gets called on every request
export async function getServerSideProps() {
  const filePath = [
    process.cwd(),
    'src/views/Home/BasicViewData/BasicViewData.tsx',
  ].join('/')
  const codeBasicViewData = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  })

  // Pass data to the page via props
  return {
    props: {
      codeBasicViewData,
    },
  }
}

export default function PageBasicViewData(props) {
  const { codeBasicViewData } = props.pageProps
  return (
    <React.Fragment>
      <BasicViewData />
      <Content>
        <Text
          style={{ textAlign: 'end', width: '100%', display: 'block' }}
          copyable={{
            text: codeBasicViewData,
            icon: (
              <div>
                Copy Code &nbsp;
                <CopyOutlined />
              </div>
            ),
          }}
        />

        <SyntaxHighlighter
          showLineNumbers
          language={'typescript'}
          wrapLongLines
          style={atomOneDark}
        >
          {codeBasicViewData}
        </SyntaxHighlighter>
      </Content>
    </React.Fragment>
  )
}
