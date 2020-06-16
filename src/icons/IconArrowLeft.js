import Icon from '@ant-design/icons/es/components/Icon'
import ArrowLeft from 'svgs/ArrowLeft.svg'
import PropTypes from 'shortcuts/PropTypes'

const IconArrowLeft = (props) => {
  const { style, ...otherProps } = props
  return <Icon component={ArrowLeft} style={{ ...style }} {...otherProps} />
}

IconArrowLeft.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
}

export default IconArrowLeft
