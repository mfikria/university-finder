import type { NextComponentType } from 'next'
import React, { useEffect } from 'react'
import { List, Skeleton, Divider, Typography } from 'antd'
const { Title } = Typography

import { BsFillGeoAltFill, BsBoxArrowUpRight } from 'react-icons/bs'
import { useUniversities } from '../../hooks/university'
import styles from './style.module.scss'
import { University } from '../../types/university.d'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const UniversityList: NextComponentType = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const { loadingFavorite, favoriteUniversities, fetchFavoriteUniversities } =
    useUniversities()

  useEffect(() => {
    if (session) {
      fetchFavoriteUniversities()
    }
  }, [session])

  const loader = <Skeleton paragraph={{ rows: 1 }} active />
  const endMessage =
    loadingFavorite || favoriteUniversities.length === 0 ? null : (
      <Divider plain>No more data</Divider>
    )

  return (
    <>
      <Title level={3}>Your Favorite Universities</Title>
      <div id="scrollableList" className={styles.scrollableList}>
        <List
          loading={loadingFavorite}
          dataSource={favoriteUniversities}
          renderItem={(university: University) => {
            const website = university.web_pages[0]
            const description = (
              <>
                <div className={styles.universityDescription}>
                  <BsFillGeoAltFill />
                  {university.country}
                </div>
                <div className={styles.universityWebsite}>
                  <BsBoxArrowUpRight />
                  <a href={website} target="_blank" rel="noreferrer">
                    {website}
                  </a>
                </div>
              </>
            )
            return (
              <List.Item>
                <List.Item.Meta
                  title={university.name}
                  description={description}
                />
              </List.Item>
            )
          }}
        />
      </div>
    </>
  )
}

export default UniversityList
