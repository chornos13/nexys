import React from 'react'
import { ReactComponentLike } from 'prop-types'

interface IProps {
  Component: ReactComponentLike
}

function PublicContainer(props: IProps) {
  const { Component } = props
  return (
    <div>
      Header
      <Component {...props} />
      Footer
    </div>
  )
}

export default PublicContainer
