import { CSSProperties } from 'react'
import { Typography } from 'antd'
import cssFont from 'css/cssFont.scss'
import cx from 'shortcuts/cx'
import { TextProps } from 'antd/lib/typography/Text'
import { TextAlignProperty } from 'csstype'

const { Text: CurText } = Typography

const mapColor = {
  white: 'white',
  black: 'black',
  gray: '#677E9B',
  red: '#EB5757',
  green: '#27AE60',
  primary: '#1B5292',
}

interface IText extends TextProps {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'black' | 'gray' | 'red' | 'green' | any
  bold?: boolean
  align?: TextAlignProperty
  style?: CSSProperties
}

function Text(props: IText) {
  const {
    className,
    size = 'sm',
    color = 'gray',
    align,
    bold,
    style,
    ...cProps
  } = props

  const weight = bold ? 'bold' : 'normal'

  const classFont = `font-${size}-${weight}`

  return (
    <CurText
      className={cx(cssFont[classFont], className)}
      style={{
        color: mapColor[color] || color,
        ...(align ? { textAlign: align, display: 'block' } : {}),
        ...style,
      }}
      {...cProps}
    />
  )
}

export default Text
