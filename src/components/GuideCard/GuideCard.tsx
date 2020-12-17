import React from 'react'
import { Card } from 'antd'
import Text from 'components/Typography/Text'

interface GuideCardProps {
  title: string
  steps?: string[]
}

function GuideCard(props: GuideCardProps) {
  const { steps, title } = props
  return (
    <Card bodyStyle={{ padding: 16 }}>
      <div style={{ backgroundColor: '#ebebeb', padding: 8 }}>
        <Text align={'center'} color={'black'} size={24} bold>
          {title}
        </Text>

        <ul style={{ padding: '0 16px 0 24px', listStyle: 'decimal' }}>
          {steps?.map((value) => {
            return (
              <li key={value}>
                <Text color={'black'}>{value}</Text>
              </li>
            )
          })}
        </ul>
      </div>
    </Card>
  )
}

export default GuideCard
