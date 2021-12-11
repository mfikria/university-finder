import type { NextComponentType } from 'next'
import trim from 'lodash/trim'
import React, { useEffect, useState } from 'react'
import { List, Skeleton, Divider, Select } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BsFillGeoAltFill, BsBoxArrowUpRight } from 'react-icons/bs'
import { useUniversities } from '../../hooks/university'
import styles from './style.module.scss'
import {
  SortBy,
  University,
  UniversityFilterType,
  UniversitySortType,
} from '../../types/university.d'
import UniversityFilter from '../UniversityFilter'
import { useRouter } from 'next/router'

const UniversityList: NextComponentType = () => {
  const router = useRouter()
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME)
  const [sortType, setSortType] = useState<string>('asc')

  const {
    loading,
    fetchUniversities,
    loadMoreUniversities,
    sortUniversities,
    visibleUniversities,
    total,
  } = useUniversities()

  useEffect(() => {
    fetchUniversities(
      router.query as UniversityFilterType,
      { field: sortBy.valueOf(), type: sortType } as UniversitySortType
    )
  }, [router])

  useEffect(() => {
    sortUniversities({
      field: sortBy.valueOf(),
      type: sortType,
    } as UniversitySortType)
  }, [sortBy, sortType])

  const loader = <Skeleton paragraph={{ rows: 1 }} active />
  const endMessage =
    loading || visibleUniversities.length === 0 ? null : (
      <Divider plain>No more data</Divider>
    )

  const onFilterChange = (filter: UniversityFilterType) => {
    router.query = {
      name: trim(filter.name),
      country: trim(filter.country),
    }
    router.push(router)
  }

  return (
    <>
      <UniversityFilter onSubmit={onFilterChange} />
      <div className={styles.listHeader}>
        <div>Sort By:</div>
        <Select
          className={styles.sortBy}
          value={sortBy as any}
          onChange={setSortBy as any}
        >
          <Select.Option value={SortBy.NAME}>Name</Select.Option>
          <Select.Option value={SortBy.COUNTRY}>Country</Select.Option>
        </Select>
        <Select value={sortType as any} onChange={setSortType as any}>
          <Select.Option value="desc">DESC</Select.Option>
          <Select.Option value="asc">ASC</Select.Option>
        </Select>
      </div>
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
    </>
  )
}

export default UniversityList
