import type { NextComponentType } from 'next'
import trim from 'lodash/trim'
import React, { useEffect, useState } from 'react'
import { List, Skeleton, Divider, Select, Button, notification } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  BsFillGeoAltFill,
  BsBoxArrowUpRight,
  BsFillStarFill,
} from 'react-icons/bs'
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
import { useSession } from 'next-auth/react'
import get from 'lodash/get'

const UniversityList: NextComponentType = () => {
  const { data: session } = useSession()
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
    addToFavorite,
    favoriteUniversities,
    fetchFavoriteUniversities,
  } = useUniversities()

  useEffect(() => {
    fetchUniversities(
      router.query as UniversityFilterType,
      { field: sortBy.valueOf(), type: sortType } as UniversitySortType
    )
  }, [router])

  useEffect(() => {
    if (session) {
      fetchFavoriteUniversities()
    }
  }, [session])

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

  const addToFavoriteUniversities = async (university: University) => {
    try {
      await addToFavorite(university)
      notification.success({
        message: `${university.name} is successfully added to favorite`,
      })
      console.log(favoriteUniversities)
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

  const isUniversityAddedToFavorite = (university: University) => {
    return (
      favoriteUniversities.findIndex((u: any) => u?.name === university.name) >
      -1
    )
  }

  return (
    <>
      <UniversityFilter onSubmit={onFilterChange} />
      <div className={styles.listHeader}>
        <div>Sort By:</div>
        <Select
          size="small"
          className={styles.sortBy}
          value={sortBy as any}
          onChange={setSortBy as any}
        >
          <Select.Option value={SortBy.NAME}>Name</Select.Option>
          <Select.Option value={SortBy.COUNTRY}>Country</Select.Option>
        </Select>
        <Select
          size="small"
          value={sortType as any}
          onChange={setSortType as any}
        >
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
                  {isUniversityAddedToFavorite(university) ? (
                    <Button
                      type="primary"
                      ghost
                      className={styles.addedFavoriteButton}
                      size="small"
                      icon={<BsFillStarFill />}
                    >
                      Added to Favorite
                    </Button>
                  ) : (
                    <Button
                      disabled={!session}
                      className={styles.favoriteButton}
                      size="small"
                      icon={<BsFillStarFill />}
                      onClick={(e) => {
                        e.preventDefault()
                        addToFavoriteUniversities(university)
                      }}
                    >
                      Add to Favorite
                    </Button>
                  )}
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
