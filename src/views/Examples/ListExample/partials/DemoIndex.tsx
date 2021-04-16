import React, { useEffect, useState } from 'react'
import dynamic from 'next/dist/next-server/lib/dynamic'
import { Button, Card, Divider, Tooltip } from 'antd'
import useToggle from '@nexys/hooks/useToggle'

const CodeViewer = dynamic(
  () => import('@nexys/components/CodeViewer/CodeViewer'),
  {
    loading: () => <div>Loading...</div>,
  },
)

interface DemoIndexProps {
  title: string
  description: string
  filename: string
  folder: string
  sourceCode: string
}

function DemoIndex(props: DemoIndexProps) {
  const { folder, filename, description, title, sourceCode } = props
  const [Component, setComponent] = useState(null)
  const stateShowCode = useToggle()

  useEffect(() => {
    const tempComponent = dynamic(
      () => import(`@nexys/examples/${folder}/${filename}`),
      {
        loading: () => <div>Loading...</div>,
      },
    )

    setComponent(tempComponent)
  }, [])

  return (
    <React.Fragment>
      <Card id={filename}>
        <Card.Meta
          title={
            <React.Fragment>
              <Divider orientation={'left'}>{title}</Divider>
            </React.Fragment>
          }
          description={description}
          style={{
            marginBottom: 10,
          }}
        />
        {Component && <Component />}
        <div style={{ textAlign: 'center' }}>
          <Tooltip title={stateShowCode.isToggled ? 'Hide Code' : 'Show code'}>
            <Button
              type={'text'}
              onClick={() => {
                if (stateShowCode.isToggled) {
                  stateShowCode.untoggle()
                } else {
                  stateShowCode.toggle()
                }
              }}
            >
              {`<${stateShowCode.isToggled ? '' : '/'}>`}
            </Button>
          </Tooltip>
        </div>
        {stateShowCode.isToggled && <CodeViewer text={sourceCode} />}
      </Card>
    </React.Fragment>
  )
}

export default DemoIndex
