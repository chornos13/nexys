import React from 'react'
import Content from 'components/Content/Content'
import Welcome from 'views/Home/partials/Welcome'
import WhatWillLearn from 'views/Home/partials/WhatWillLearn'

const styleContent = {
  paddingTop: 50,
  paddingBottom: 50,
}

function Home() {
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
        <WhatWillLearn />
      </Content>
    </div>
  )
}

export default Home
