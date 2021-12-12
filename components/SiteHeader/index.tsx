import styles from './style.module.scss'
import { Menu, Layout, Dropdown, Row, Col, Avatar } from 'antd'
import { useRouter } from 'next/router'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useSession } from 'next-auth/react'
import {
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineNotification,
  AiOutlineStar,
} from 'react-icons/ai'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type NavigationType = {
  title: string
  url: string
  icon: any
}

const SiteHeader = () => {
  const { data: session } = useSession()
  const [navigations, setNavigations] = useState<Array<any>>([])
  const router = useRouter()

  const initialNavigations: any = [
    {
      url: '/',
      icon: <AiOutlineHome />,
      title: 'Home',
    },
    {
      url: '/subscription',
      icon: <AiOutlineNotification />,
      title: 'Subscription',
    },
  ]

  useEffect(() => {
    if (session) {
      setNavigations([
        ...initialNavigations,
        {
          url: '/favorites',
          icon: <AiOutlineStar />,
          title: 'Favorites',
        },
      ])
    } else {
      setNavigations(initialNavigations)
    }
  }, [session])

  const onClickMenu = (item: MenuInfo) => {
    router.push(item.key)
  }

  const menu = session ? (
    <Menu>
      <Menu.Item>
        <Link href="/api/auth/signout">Logout</Link>
      </Menu.Item>
    </Menu>
  ) : (
    <Menu>
      <Menu.Item>
        <Link href="/auth/signin">LOGIN</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/auth/registration">REGISTER</Link>
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
              <Menu.Item icon={nav.icon} key={nav.url}>
                {nav.title}
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col className={styles.accountMenu}>
          <Dropdown overlay={menu}>
            <span>
              <Avatar icon={<AiOutlineUser />} />
              {session && (
                <span className={styles.email}>{session?.user?.email}</span>
              )}
            </span>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default SiteHeader
