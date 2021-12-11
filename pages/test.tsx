import { Typography, Button } from 'antd'
const { Title } = Typography
import Link from 'next/link'
import styles from './404.module.scss'

export default function NotFoundPage() {
  return (
    <div className={styles.layout404}>
      <div className={styles.title}>404</div>
      <Title>Oopss... Page Not Found</Title>
      <Button>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  )
}
