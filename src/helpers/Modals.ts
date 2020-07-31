import { ModalFuncProps } from 'antd/lib/modal'
import { Modal } from 'antd'

type ModalReturn = {
  destroy: () => void
  update: (newConfig: ModalFuncProps) => void
}

function deleteConfirm(props: ModalFuncProps): ModalReturn {
  return Modal.confirm({
    title: 'Hapus Data',
    content: 'Apakah anda yakin ingin menghapus data tersebut ?',
    okText: 'Delete',
    okButtonProps: {
      // @ts-ignore
      type: 'danger',
    },
    cancelText: 'Batal',
    ...props,
  })
}

export default {
  deleteConfirm,
}
