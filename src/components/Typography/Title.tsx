import { Typography } from 'antd'
import { TitleProps } from 'antd/lib/typography/Title'
import cssFont from 'css/cssFont.scss'
import cx from 'shortcuts/cx'
import cssTitle from './Title.module.scss'

const { Title: CurTitle } = Typography

interface CustomTitleProps extends TitleProps {
  color?: 'default' | 'primary'
  noMargin?: boolean
}

const mapColor = {
  default: 'black',
  primary: '#1B5292',
}

function Title(props: CustomTitleProps) {
  const { className, noMargin, color, style, ...otherProps } = props
  return (
    <CurTitle
      className={cx(cssFont.font, cssTitle.wordSpacing, className)}
      style={{
        color: mapColor[color] || mapColor.default,
        ...(noMargin ? { marginBottom: 0 } : {}),
        ...style,
      }}
      {...otherProps}
    />
  )
}

export default Title
