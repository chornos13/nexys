import Icon from '@ant-design/icons/es/components/Icon'
import Close from 'svgs/Close.svg'
import PropTypes from 'shortcuts/PropTypes'

const IconClose = (props) => {
  const { style, ...otherProps } = props
  return <Icon component={Close} style={{ ...style }} {...otherProps} />
}

IconClose.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
}

export default IconClose
