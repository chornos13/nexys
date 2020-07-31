import React from 'react'
import { SmileOutlined } from '@ant-design/icons'
import { Button, Card, Result } from 'antd'

function Home() {
  return (
    <Card>
      <Result
        icon={<SmileOutlined />}
        title="Great, this is Home!"
        extra={<Button type="primary">Next</Button>}
      />
    </Card>
  )
}

export default Home
