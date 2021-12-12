import type { NextPage } from 'next'
import { Layout } from 'antd'
import styles from './index.module.scss'
import FavoriteUniversityList from '../components/FavoriteUniversityList'
import SiteHeader from '../components/SiteHeader'

const FavoriteUniversities: NextPage = () => {
  return (
    <Layout>
      <SiteHeader />
      <Layout.Content className={styles.siteLayout}>
        <div className={styles.siteLayoutBackground}>
          <FavoriteUniversityList />
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default FavoriteUniversities
