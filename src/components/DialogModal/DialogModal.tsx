import React from 'react'
import { Modal as CurModal } from 'antd'
import { ModalProps } from 'antd/lib/modal/Modal'
import cssDialogModal from 'components/DialogModal/DialogModal.module.scss'
import IconArrowLeft from 'icons/IconArrowLeft'
import Title from 'components/Typography/Title'
import Text from 'components/Typography/Text'
import cx from 'shortcuts/cx'

interface CustomModalProps extends ModalProps {
  children?: React.ReactNode
  titleIcon?: React.ReactNode
  description?: string
}

function DialogModal(props: CustomModalProps) {
  const { title, titleIcon, description, children, ...otherProps } = props

  return (
    <CurModal
      className={cssDialogModal.container}
      {...otherProps}
      closeIcon={<IconArrowLeft />}
    >
      <div className={cx(cssDialogModal.icon)}>{titleIcon}</div>

      <Title level={4} style={{ textAlign: 'center', marginBottom: 0 }}>
        {title}
      </Title>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        {
          // @ts-ignore
          <Text style={{ color: '#4F4F4F' }}>{description}</Text>
        }
      </div>
      {children}
    </CurModal>
  )
}

export default DialogModal
