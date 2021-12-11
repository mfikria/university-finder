import type { NextComponentType } from 'next'
import React, { useState, useEffect } from 'react'
import { List, message, Avatar, Skeleton, Divider } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BsFillGeoAltFill, BsBoxArrowUpRight } from 'react-icons/bs'
import { useUniversities } from '../../hooks/university'
import styles from './style.module.scss'
import { University } from '../../types/university'

const UniversityList: NextComponentType = () => {
  const {
    loading,
    fetchUniversities,
    loadMoreUniversities,
    visibleUniversities,
    total,
  } = useUniversities()

  useEffect(() => {
    fetchUniversities()
  }, [])

  const loader = <Skeleton paragraph={{ rows: 1 }} active />
  const endMessage = loading ? null : <Divider plain>No more data 😎</Divider>

  return (
    <div id="scrollableList" className={styles.scrollableList}>
      <InfiniteScroll
        dataLength={visibleUniversities.length}
        next={loadMoreUniversities}
        hasMore={visibleUniversities.length < total}
        loader={loader}
        endMessage={endMessage}
        scrollableTarget="scrollableList"
      >
        <List
          loading={loading}
          dataSource={visibleUniversities}
          renderItem={(university: University) => {
            const description = (
              <div className={styles.universityDescription}>
                <BsFillGeoAltFill />
                {university.country}
              </div>
            )
            const website = university.web_pages[0]
            return (
              <List.Item>
                <List.Item.Meta
                  title={university.name}
                  description={description}
                />
                <div className={styles.universityWebsite}>
                  <BsBoxArrowUpRight />
                  <a href={website} target="_blank" rel="noreferrer">
                    {website}
                  </a>
                </div>
              </List.Item>
            )
          }}
        />
      </InfiniteScroll>
    </div>
  )
}

export default UniversityList
