import type { NextPage } from 'next'
import { Layout, Menu, Breadcrumb } from 'antd'
import styles from './index.module.scss'
import UniversityList from '../components/UniversityList'

const { Header, Content, Footer } = Layout

const Home: NextPage = () => {
  return (
    <Layout>
      <Header className={styles.siteHeader}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content className={styles.siteLayout}>
        <div className={styles.siteLayoutBackground}>
          <UniversityList />
        </div>
      </Content>
    </Layout>
  )
}

export default Home
