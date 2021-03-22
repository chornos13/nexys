import dynamic from 'next/dynamic'

const PublicContainer = dynamic(() => import('layouts/containers/Public'))

const routes = [
  {
    path: '/',
    layout: PublicContainer,
    exact: true,
  },
  {
    path: '/examples/',
    layout: PublicContainer,
  },
]

export default routes
