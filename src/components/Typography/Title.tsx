import { Typography } from 'antd'
import { TitleProps } from 'antd/lib/typography/Title'
import cssFont from 'css/cssFont.scss'
import cx from 'shortcuts/cx'

const { Title: CurTitle } = Typography

function Title(props: TitleProps) {
  const { className } = props
  return <CurTitle className={cx(cssFont.font, className)} {...props} />
}


export default Title
