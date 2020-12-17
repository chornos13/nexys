import React, { useMemo } from 'react'
import Text from 'components/Typography/Text'
import ErrorView from 'fields/HOC/ErrorView/ErrorView'

export interface UseTitleAndErrorProps {
  name?: any
  title?: string
}

function useTitleAndError(options: UseTitleAndErrorProps) {
  const { title, name } = options
  const nodeTitle = useMemo(() => {
    return <Text>{title}</Text>
  }, [title])

  const nodeError = name && <ErrorView name={name} />

  return [nodeTitle, nodeError]
}

export default useTitleAndError
