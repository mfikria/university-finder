import styles from './style.module.scss'
import { Menu, Layout, Dropdown, Row, Col, Avatar } from 'antd'
import { useRouter } from 'next/router'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useSession } from 'next-auth/react'
import { AiOutlineUser } from 'react-icons/ai'
import Link from 'next/link'

type NavigationType = {
  title: string
  url: string
}

const SiteHeader = () => {
  const { data: session } = useSession()
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

  const menu = (
    <Menu>
      <Menu.Item>
        <Link href="/api/auth/signout">Logout</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout.Header className={styles.siteHeader}>
      <Row>
        <Col flex="auto">
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
        </Col>
        <Col className={styles.accountMenu}>
          {session ? (
            <Dropdown overlay={menu}>
              <span>
                <Avatar icon={<AiOutlineUser />} />
                {session?.user?.email}
              </span>
            </Dropdown>
          ) : (
            <Link href="/api/auth/signin">LOGIN</Link>
          )}
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default SiteHeader
