import React, { useState } from 'react'
import { Form, Input, Checkbox, Button, Layout, notification } from 'antd'
import styles from './registration.module.scss'
import axios from 'axios'
import get from 'lodash/get'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true)
      const { data: res } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/registration`,
        {
          email: values.email,
          password: values.password,
        }
      )
      await signIn('credentials', {
        email: form.getFieldValue('email'),
        password: form.getFieldValue('password'),
        callbackUrl: '/',
      })
      notification.success({
        message: `Email ${res.data?.email} is successfully registered`,
      })
    } catch (err: any) {
      const type = get(err, 'response.data.errors[0].type')
      const message =
        type === 'unique violation'
          ? 'Email has been registered. Please login.'
          : get(
              err,
              'response.data.errors[0].message',
              'Error happened. Please try again later!'
            )
      notification.error({
        message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout.Content className={styles.siteLayout}>
      <div className={styles.siteLayoutBackground}>
        <div className={styles.registrationFormWrapper}>
          <Image
            width={200}
            height={50}
            src="/logo.svg"
            alt="Logo"
            className={styles.logo}
          />
          <Form
            {...formItemLayout}
            form={form}
            className={styles.registrationForm}
            name="register"
            onFinish={onSubmit}
            initialValues={{
              residence: ['zhejiang', 'hangzhou', 'xihu'],
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

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }

                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    )
                  },
                }),
              ]}
            >
              <Input.Password readOnly={isSubmitting} />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox disabled={isSubmitting}>
                I have read the <Link href="#">agreement</Link>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button loading={isSubmitting} type="primary" htmlType="submit">
                Register
              </Button>
              Or <Link href="/api/auth/signin">login now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout.Content>
  )
}

export default RegistrationForm
