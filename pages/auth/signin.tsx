import React, { useState } from 'react'
import { Form, Input, Alert, Layout, Button, notification } from 'antd'
import styles from './signin.module.scss'
import get from 'lodash/get'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const RegistrationForm = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true)
      await signIn('credentials', {
        email: form.getFieldValue('email'),
        password: form.getFieldValue('password'),
        callbackUrl: '/',
      })
    } catch (err: any) {
      notification.error({
        message: get(
          err,
          'response.data.errors[0].message',
          'Error happened. Please try again later!'
        ),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout.Content className={styles.siteLayout}>
      <div className={styles.siteLayoutBackground}>
        <div className={styles.signinFormWrapper}>
          <Image
            width={200}
            height={50}
            src="/logo.svg"
            alt="Logo"
            className={styles.logo}
          />
          {router.query.error && (
            <Alert
              description="Sign in failed. Check the details you provided are correct."
              type="error"
              closable
            />
          )}
          <Form
            {...formItemLayout}
            form={form}
            className={styles.signinForm}
            name="signin"
            onFinish={onSubmit}
            initialValues={{
              prefix: '86',
            }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input readOnly={isSubmitting} />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password readOnly={isSubmitting} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button loading={isSubmitting} type="primary" htmlType="submit">
                Login
              </Button>
              Or <Link href="/auth/registration">Register now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout.Content>
  )
}

export default RegistrationForm
