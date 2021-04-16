import React from 'react'
import { useField } from 'formik'
import useTitleAndError from '@nexys/fields/useTitleAndError/useTitleAndError'
import { Upload } from 'antd'
import { UploadProps } from 'antd/lib/upload'

export type FUploadProps = Partial<UploadProps> & {
  title?: string
  children?: React.ReactNode
}

function FUpload(props: FUploadProps) {
  const [field, , helpers] = useField(props as any) // [valueField, valueMeta, valueHelpers]
  const [title, error] = useTitleAndError(props)

  return (
    <div>
      {title}
      <Upload
        onRemove={(file) => {
          const index = field.value.indexOf(file)
          const newFileList = field.value.slice()
          newFileList.splice(index, 1)
          helpers.setValue(newFileList)
        }}
        beforeUpload={(file) => {
          helpers.setValue([...field.value, file])
          return false
        }}
        fileList={field.value}
        {...props}
      />
      {error}
    </div>
  )
}

export default FUpload
