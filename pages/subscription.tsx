import { NextPage } from 'next'
import SiteHeader from '../components/SiteHeader'
import { Layout, Form, Input, Button, Typography, Card } from 'antd'
import styles from './subscription.module.scss'
const { Title } = Typography

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
}

const onSubmit = () => {
  // TODO: submit to backend
}

const Subscription: NextPage = () => {
  return (
    <Layout>
      <SiteHeader />
      <Layout.Content className={styles.siteLayout}>
        <Card bordered={false} className={styles.subscriptionCard}>
          <Title level={3}>Subscribe and access all our features!</Title>
          <Form
            name="nest-messages"
            onFinish={onSubmit}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={'email'}
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input placeholder="Input email to subscribe" />
            </Form.Item>
            <Form.Item className={styles.subscriptionCardFooter}>
              <Button type="primary" htmlType="submit">
                Subscribe
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout.Content>
    </Layout>
  )
}

export default Subscription
