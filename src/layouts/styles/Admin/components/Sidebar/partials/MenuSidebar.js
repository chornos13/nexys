import { Menu } from 'antd'
import Link from 'next/link'
import { withRouter } from 'next/router'
import PropTypes from 'shortcuts/PropTypes'
import cssMenuSidebar from 'layouts/styles/Admin/components/Sidebar/partials/MenuSidebar.module.scss'

const menus = [
  {
    url: '/admin/mejaku',
    text: 'Mejaku',
  },
  {
    url: '/admin/konsep-surat',
    text: 'Konsep Surat',
  },
  {
    url: '/admin/arsip',
    text: 'Arsip',
  },
  {
    url: '/admin/laporan',
    text: 'Laporan',
  },
  {
    url: '/admin/auto-disposisi',
    text: 'Auto Disposisi',
  },
  {
    url: '/admin/booking-nomor',
    text: 'Booking Nomor',
  },
  {
    divider: true,
  },
  {
    url: '/admin/faq',
    text: 'FAQ',
  },
  {
    url: '/admin/panduan',
    text: 'Panduan',
  },
  {
    divider: true,
  },
]

function MenuSidebar(props) {
  const { router } = props
  const { route } = router
  const curRoute = route === '/admin' ? menus[0].url : route
  let countDivider = 0
  return (
    <Menu
      className={cssMenuSidebar.backgroundSider}
      theme="dark"
      mode="inline"
      selectedKeys={[curRoute]}
    >
      {menus.map((menu) => {
        const { divider, url, text, Icon } = menu
        countDivider += 1

        if (divider) {
          return (
            <Menu.Divider key={countDivider} style={{ margin: '51px 0' }} />
          )
        }
        return (
          <Menu.Item key={url}>
            {Icon && <Icon style={{ marginRight: 10 }} />}
            <Link href={url}>
              <a>{text}</a>
            </Link>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

MenuSidebar.propTypes = {
  router: PropTypes.shape({
    route: PropTypes.string,
  }),
}

export default withRouter(MenuSidebar)
