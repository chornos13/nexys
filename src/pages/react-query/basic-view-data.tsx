import BasicViewData from 'views/ReactQuery/BasicViewData/BasicViewData'
import withCodeViewer from 'HOC/withCodeViewer'
import getSourceCode from 'components/CodeViewer/getSourceCode'

export async function getStaticProps() {
  return {
    props: {
      codeBasicViewData: await getSourceCode(
        'views/ReactQuery/BasicViewData/BasicViewData.tsx',
      ),
    },
  }
}

export default withCodeViewer('codeBasicViewData', BasicViewData)
