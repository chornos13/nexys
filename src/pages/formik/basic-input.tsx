import BasicInput from 'views/Formik/BasicInput/BasicInput'
import React from 'react'
import withCodeViewer from 'HOC/withCodeViewer'
import getSourceCode from 'components/CodeViewer/getSourceCode'

export async function getStaticProps() {
  return {
    props: {
      codeBasicViewData: await getSourceCode(
        'views/Formik/BasicInput/BasicInput.tsx',
      ),
    },
  }
}

export default withCodeViewer('codeBasicViewData', BasicInput)
