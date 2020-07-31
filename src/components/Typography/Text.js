import { Typography } from 'antd'
import cssFont from 'css/cssFont.scss'
import cx from 'shortcuts/cx'
import PropTypes from 'shortcuts/PropTypes'

const { Text: CurText } = Typography

const mapColor = {
  white: 'white',
  black: 'black',
  gray: '#677E9B',
  red: '#EB5757',
  green: '#27AE60',
  primary: '#1B5292',
}

function Text(props) {
  const { className, size, bold, color, style, ...cProps } = props

  const weight = bold ? 'bold' : 'normal'

  const classFont = `font-${size}-${weight}`

  return (
    <CurText
      className={cx(cssFont[classFont], className)}
      style={{
        color: mapColor[color] || color,
        ...style,
      }}
      {...cProps}
    />
  )
}

Text.defaultProps = {
  size: 'sm',
  color: 'gray',
}

Text.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.any]),
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['white', 'black', 'gray', 'red']),
    PropTypes.string,
  ]),
  bold: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
}

export default Text
