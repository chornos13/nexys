import React from 'react'
import { FormikContextType, useField } from 'formik'
import useTitleAndError, {
  UseTitleAndErrorProps,
} from '@nexys/fields/useTitleAndError/useTitleAndError'
import dynamic from 'next/dynamic'
import { ReactQuillProps } from '@nexys/components/TextQuill/interface'

const TextQuill = dynamic(
  () => import('@nexys/components/TextQuill/TextQuill'),
  {
    ssr: false,
  },
)

export type FQuillProps = ReactQuillProps &
  UseTitleAndErrorProps & {
    name: string
    /**
     * Formik Context
     */
    formik?: FormikContextType<any>
  }

const TextQuilFormats = [
  'header',
  'font',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'link',
  'image',
  'list',
  'bullet',
  'indent',
  'script',
  'align',
]

const TextQuilModules = {
  toolbar: [
    [{ header: [] }, { font: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link', 'image'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

function FQuill(props: FQuillProps) {
  const [field, , helpers] = useField(props as any)
  const [title, error] = useTitleAndError(props)

  return (
    <React.Fragment>
      {title}
      <TextQuill
        {...field}
        theme="snow"
        modules={TextQuilModules}
        formats={TextQuilFormats}
        onBlur={() => {
          helpers.setTouched(true)
        }}
        onChange={(value) => {
          helpers.setValue(value)
        }}
        {...props}
      />
      {error}
    </React.Fragment>
  )
}

export default FQuill
