import dynamic from 'next/dynamic'

const PublicContainer = dynamic(() => import('layouts/containers/Public'))

const routes = [
  {
    path: '/',
    layout: PublicContainer,
    exact: true,
  },
  {
    path: '/react-query/basic-view-data',
    layout: PublicContainer,
    exact: true,
  },
]

export default routes
