import React, { useEffect } from 'react'
import { Form, Row, Col, Input, Button } from 'antd'
import styles from './style.module.scss'
import { useRouter } from 'next/router'
import { UniversityFilterType } from '../../types/university'
import { BsBank, BsGeoAlt } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'

const UniversityFilter = ({
  onSubmit = (_: UniversityFilterType) => {}, // eslint-disable-line
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
  }, [router])

  return (
    <Form form={form} className={styles.form} onFinish={onSubmit}>
      <Row gutter={8} align="bottom">
        <Col span={8}>
          <Form.Item className={styles.formItem} name="name">
            <Input allowClear prefix={<BsBank />} placeholder="university..." />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item className={styles.formItem} name="country">
            <Input allowClear prefix={<BsGeoAlt />} placeholder="country..." />
          </Form.Item>
        </Col>
        <Col span={8} className={styles.formActions}>
          <Button icon={<AiOutlineSearch />} type="primary" htmlType="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default UniversityFilter
