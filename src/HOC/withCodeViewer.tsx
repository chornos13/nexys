import React from 'react'
import Content from 'components/Content/Content'
import dynamic from 'next/dynamic'

const CodeViewer = dynamic(() => import('components/CodeViewer/CodeViewer'))

function withCodeViewer(keyProp, Component) {
  return function WithCodeViewer(props) {
    return (
      <React.Fragment>
        <Content style={{ paddingBottom: 10 }}>
          <Component {...props} />
        </Content>
        <Content>
          <CodeViewer text={props.pageProps[keyProp]} />
        </Content>
      </React.Fragment>
    )
  }
}

export default withCodeViewer
