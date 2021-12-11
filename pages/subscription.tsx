import { NextPage } from 'next'
import SiteHeader from '../components/SiteHeader'
import { Layout } from 'antd'
import styles from './index.module.scss'

const Subscription: NextPage = () => {
  return (
    <Layout>
      <SiteHeader />
      <Layout.Content className={styles.siteLayout}>
        <div className={styles.siteLayoutBackground}></div>
      </Layout.Content>
    </Layout>
  )
}

export default Subscription
