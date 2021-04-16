import { CSSProperties } from 'react'
import { Typography } from 'antd'
import { TextProps } from 'antd/lib/typography/Text'
import { TextAlignProperty } from 'csstype'

const { Text: CurText } = Typography

const mapColor = {
  white: 'white',
  black: 'black',
  gray: '#2a2a2a',
  red: '#dd4545',
  green: '#27AE60',
  primary: '#1B5292',
}

const mapFontFamily = {
  bold: 'SFProText-Bold',
  regular: 'SFProText-Regular',
}

interface IText extends TextProps {
  className?: string
  size?: number
  color?: 'primary' | 'white' | 'black' | 'gray' | 'red' | 'green' | any
  bold?: boolean
  align?: TextAlignProperty
  style?: CSSProperties
  fontFamily?: 'bold' | 'regular'
  block?: boolean
}

function Text(props: IText) {
  const {
    size = '16',
    color = 'inherit',
    align,
    bold,
    block,
    style,
    fontFamily = 'regular',
    ...cProps
  } = props

  const weight = bold ? 'bold' : 'normal'

  return (
    <CurText
      style={{
        fontFamily: mapFontFamily[fontFamily],
        color: mapColor[color] || color,
        fontSize: size,
        fontWeight: weight,
        ...(align ? { textAlign: align, display: 'block' } : {}),
        ...(block ? { width: '100%', display: 'block' } : {}),
        ...style,
      }}
      {...cProps}
    />
  )
}

export default Text
