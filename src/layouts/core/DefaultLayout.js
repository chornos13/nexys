import React from 'react'
import dynamic from 'next/dynamic'
// import Public from 'layouts/styles/Public'
// import Admin from 'layouts/styles/Admin'

const Public = dynamic(() => import('layouts/styles/Public'))
const Admin = dynamic(() => import('layouts/styles/Admin'))

function getSiteLayout(appProps) {
  const { router } = appProps
  const { route } = router

  if (route === '/about') {
    return <Admin {...appProps} />
  }

  return <Public {...appProps} />
}

export default getSiteLayout
