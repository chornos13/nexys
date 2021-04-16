import { CSSProperties } from 'react'
import { Typography } from 'antd'
import { TitleProps } from 'antd/lib/typography/Title'
import { TextAlignProperty } from 'csstype'

const { Title: CurTitle } = Typography

const mapColor = {
  default: 'inherit',
  primary: '#1B5292',
}

const mapFontFamily = {
  regular: 'SFProText-Regular',
}

interface CustomTitleProps extends TitleProps {
  className?: string
  color?: 'default' | 'primary' | any
  size?: number
  noMargin?: boolean
  align?: TextAlignProperty
  style?: CSSProperties
  fontFamily?: 'regular' | any
}

function Title(props: CustomTitleProps) {
  const {
    noMargin,
    color,
    style,
    size = 24,
    align,
    fontFamily = mapFontFamily.regular,
    ...otherProps
  } = props

  return (
    <CurTitle
      style={{
        fontFamily,
        color: mapColor[color] || color || mapColor.default,
        ...(noMargin ? { marginBottom: 0 } : {}),
        ...(align ? { textAlign: align } : {}),
        fontSize: size,
        ...style,
      }}
      {...otherProps}
    />
  )
}

export default Title
