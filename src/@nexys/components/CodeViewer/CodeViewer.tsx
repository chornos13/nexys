import React from 'react'
import Text from '@nexys/components/Typography/Text'
import CopyOutlined from '@ant-design/icons/lib/icons/CopyOutlined'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/default-highlight'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

interface CodeViewerProps {
  text: string
}

function CodeViewer(props: CodeViewerProps) {
  const { text } = props
  return (
    <React.Fragment>
      <Text
        style={{ textAlign: 'end', width: '100%', display: 'block' }}
        copyable={{
          text,
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
        {text}
      </SyntaxHighlighter>
    </React.Fragment>
  )
}

export default CodeViewer
