import { Typography } from 'antd'
import cssFont from 'css/cssFont.scss'
import cx from 'shortcuts/cx'
import PropTypes from 'shortcuts/PropTypes'

const { Text: CurText } = Typography

const mapColor = {
  white: 'white',
  black: 'black',
  gray: '#677E9B',
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
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['white', 'black', 'gray']),
  bold: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
}

export default Text
