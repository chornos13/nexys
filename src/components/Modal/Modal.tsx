import React from 'react'
import { ModalProps } from 'antd/lib/modal/Modal'
import { Modal as CurModal } from 'antd'
import cx from 'shortcuts/cx'
import cssModal from 'components/Modal/Modal.module.scss'
import IconClose from 'icons/IconClose'
import createDraggableHeader from './draggableHeader'

interface CustomModalProps extends ModalProps {
  draggable?: boolean
  titleIcon?: React.ReactNode
}

const defaultProps = {
  draggable: true,
}

class Modal extends React.Component<CustomModalProps> {
  private refModal: any

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    const { draggable } = props
    if (draggable) {
      this.refModal = createDraggableHeader()
    }
  }

  componentDidUpdate(prevProps: Readonly<CustomModalProps>): void {
    const { props } = this
    if (prevProps.visible === false && props.visible) {
      const { current } = this.refModal
      if (current) {
        // reset posisi modal ketika sudah digeser sebelumnya
        current.style.webkitTransform = ''
        current.style.transform = ''
        current.setAttribute('data-x', '')
        current.setAttribute('data-y', '')
      }
    }
  }

  render() {
    const { className, title, titleIcon, ...otherProps } = this.props

    const elTitle = (
      <div ref={this.refModal}>
        {titleIcon && (
          <div style={{ marginRight: 10, display: 'inline' }}>{titleIcon}</div>
        )}
        {title}
      </div>
    )

    return (
      <CurModal
        className={cx(cssModal.container, className)}
        title={elTitle}
        closeIcon={<IconClose />}
        {...otherProps}
      />
    )
  }
}

export default Modal
