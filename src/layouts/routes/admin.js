import dynamic from 'next/dynamic'

const Admin = dynamic(() => import('layouts/styles/Admin/Admin'))

const routes = [
  {
    path: '/',
    layout: Admin,
    exact: true,
  },
]

export default routes
