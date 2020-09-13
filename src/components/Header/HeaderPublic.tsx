import Header from 'components/Header/Raw/Header'
import cx from 'shortcuts/cx'
import Link from 'next/link'
import Title from 'antd/lib/typography/Title'
import { AppstoreOutlined } from '@ant-design/icons'
import React from 'react'
import cssHeaderPublic from './HeaderPublic.module.scss'

function HeaderPublic() {
  return (
    <Header>
      <Link href={'/'}>
        <div className={cx(cssHeaderPublic.containerLogo)}>
          <AppstoreOutlined
            style={{
              fontSize: 21,
              color: 'white',
            }}
          />
          &nbsp;
          <Title className={cx(cssHeaderPublic.textLogo)} level={2}>
            Nadine Kemenkeu
          </Title>
        </div>
      </Link>
    </Header>
  )
}

export default HeaderPublic
