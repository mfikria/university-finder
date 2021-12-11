import styles from './style.module.scss'
import { Menu, Layout } from 'antd'
import { useRouter } from 'next/router'
import { MenuInfo } from 'rc-menu/lib/interface'

type NavigationType = {
  title: string
  url: string
}

const SiteHeader = () => {
  const router = useRouter()
  const navigations: NavigationType[] = [
    {
      url: '/',
      title: 'Home',
    },
    {
      url: '/subscription',
      title: 'Subscription',
    },
  ]

  const onClickMenu = (item: MenuInfo) => {
    router.push(item.key)
  }

  return (
    <Layout.Header className={styles.siteHeader}>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={onClickMenu}
        selectedKeys={[router.pathname]}
      >
        {navigations.map((nav) => (
          <Menu.Item key={nav.url}>{nav.title}</Menu.Item>
        ))}
      </Menu>
    </Layout.Header>
  )
}

export default SiteHeader
