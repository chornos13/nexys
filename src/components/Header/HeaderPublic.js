import Header from 'components/Header/Raw/Header'
import cx from 'shortcuts/cx'
import Link from 'next/link'
import Title from 'antd/lib/typography/Title'
import cssHeaderPublic from './HeaderPublic.module.scss'

const urlIcon =
  'https://lh3.googleusercontent.com/CQE7SUdac8fCQ1UDKhuajh_-hDdPC8qlM7SnybgQNvpfmdXQj85J8aNjZ9yHVf0-ErU=s180'

function HeaderPublic() {
  return (
    <Header>
      <Link href={'/'}>
        <div className={cx(cssHeaderPublic.containerLogo)}>
          <img
            className={cx(cssHeaderPublic.logo)}
            src={urlIcon}
            alt={'logo'}
          />
          <Title className={cx(cssHeaderPublic.textLogo)} level={2}>
            Quran Mobile
          </Title>
        </div>
      </Link>
    </Header>
  )
}

export default HeaderPublic
