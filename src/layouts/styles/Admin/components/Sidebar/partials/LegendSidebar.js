import { Col, Collapse, List, Row } from 'antd'

function LegendSidebar() {
  const data = [
    {
      text: 'Segera',
    },
    {
      text: 'Sangat Segera',
    },
    {
      text: 'Biasa',
    },
    {
      text: 'Rahasia',
    },
    {
      text: 'Tidak Rahasia',
    },
  ]

  return (
    <Collapse expandIconPosition={'right'}>
      <Collapse.Panel header="Legend" key="1">
        <List
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Row>
                <div style={{ marginRight: 22 }}>{item.icon}</div>
                <div>{item.text}</div>
              </Row>
            </List.Item>
          )}
        />
      </Collapse.Panel>
    </Collapse>
  )
}

export default LegendSidebar
