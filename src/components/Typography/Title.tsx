import { CSSProperties } from 'react'
import { Typography } from 'antd'
import { TitleProps } from 'antd/lib/typography/Title'
import cssFont from 'css/cssFont.scss'
import cx from 'shortcuts/cx'
import { TextAlignProperty } from 'csstype'
import cssTitle from './Title.module.scss'

const { Title: CurTitle } = Typography

interface CustomTitleProps extends TitleProps {
  className?: string
  color?: 'default' | 'primary' | any
  noMargin?: boolean
  align?: TextAlignProperty
  style?: CSSProperties
}

const mapColor = {
  default: 'black',
  primary: '#1B5292',
}

function Title(props: CustomTitleProps) {
  const { className, noMargin, color, style, align, ...otherProps } = props
  return (
    <CurTitle
      className={cx(cssFont.font, cssTitle.wordSpacing, className)}
      style={{
        color: mapColor[color] || color || mapColor.default,
        ...(noMargin ? { marginBottom: 0 } : {}),
        ...(align ? { textAlign: align } : {}),
        ...style,
      }}
      {...otherProps}
    />
  )
}

export default Title
