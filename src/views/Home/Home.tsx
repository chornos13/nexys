import React from 'react'
import Content from 'components/Content/Content'
import Welcome from 'views/Home/partials/Welcome'
import WhatWillLearn from 'views/Home/partials/WhatWillLearn'
import useDataWhatWilllearns from 'views/Home/partials/useDataWhatWillLearns'

const styleContent = {
  paddingTop: 50,
  paddingBottom: 50,
}

export interface ExampleDir {
  directory: string
  totalFiles: number
}

interface HomeProps {
  exampleDirs: ExampleDir[]
}

function Home(props: HomeProps) {
  const { exampleDirs } = props
  const listWhatWillLearns = useDataWhatWilllearns(exampleDirs)

  return (
    <div>
      <Content style={{ ...styleContent }}>
        <Welcome />
      </Content>

      <Content
        id={'whatWillLearn'}
        styleContainer={{
          backgroundColor: '#f3f3f3',
        }}
        style={{
          ...styleContent,
        }}
      >
        <WhatWillLearn data={listWhatWillLearns} />
      </Content>
    </div>
  )
}

export default Home
