import type { NextPage } from 'next'
import { Layout } from 'antd'
import styles from './index.module.scss'
import UniversityList from '../components/UniversityList'
import SiteHeader from '../components/SiteHeader'

const Home: NextPage = () => {
  return (
    <Layout>
      <SiteHeader />
      <Layout.Content className={styles.siteLayout}>
        <div className={styles.siteLayoutBackground}>
          <UniversityList />
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default Home
