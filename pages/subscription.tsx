import get from 'lodash/get'
import { NextPage } from 'next'
import axios from 'axios'
import SiteHeader from '../components/SiteHeader'
import {
  Layout,
  Form,
  Input,
  Button,
  Typography,
  Card,
  notification,
} from 'antd'
import styles from './subscription.module.scss'
const { Title } = Typography

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
}

const Subscription: NextPage = () => {
  const [form] = Form.useForm()

  const onSubmit = async (values: any) => {
    try {
      const { data: res } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/subscriptions`,
        {
          email: values.email,
        }
      )
      notification.success({
        message: `Email ${res.data?.email} is successfully subscribed`,
      })
    } catch (err: any) {
      notification.error({
        message: get(
          err,
          'response.data.errors[0].message',
          'Error happened. Please try again later!'
        ),
      })
    }
  }

  return (
    <Layout>
      <SiteHeader />
      <Layout.Content className={styles.siteLayout}>
        <Card bordered={false} className={styles.subscriptionCard}>
          <Title level={3}>Subscribe and access all our features!</Title>
          <Form
            form={form}
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
