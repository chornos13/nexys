import React from 'react'
import { Typography } from 'antd'
import { ParagraphProps } from 'antd/lib/typography/Paragraph'

function Paragraph(props: ParagraphProps) {
  return <Typography.Paragraph {...props} />
}

export default Paragraph
