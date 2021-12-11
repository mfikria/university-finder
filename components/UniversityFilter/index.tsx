import React, { useEffect } from 'react'
import { Form, Row, Col, Input, Button } from 'antd'
import styles from './style.module.scss'
import { useRouter } from 'next/router'
import { UniversityFilterType } from '../../types/university'

const UniversityFilter = ({
  onSubmit = (_filter: UniversityFilterType) => {},
}) => {
  const [form] = Form.useForm()
  const router = useRouter()

  useEffect(() => {
    form.setFields([
      {
        name: 'name',
        value: router.query.name || '',
      },
      {
        name: 'country',
        value: router.query.country || '',
      },
    ])
  }, [form, router])

  return (
    <Form form={form} className={styles.form} onFinish={onSubmit}>
      <Row gutter={24} align="bottom">
        <Col span={8}>
          <Form.Item className={styles.formItem} name="name" label="Name">
            <Input placeholder="Input university name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item className={styles.formItem} name="country" label="Country">
            <Input placeholder="Input country" />
          </Form.Item>
        </Col>
        <Col span={8} className={styles.formFooter}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields()
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
      <Row></Row>
    </Form>
  )
}

export default UniversityFilter
