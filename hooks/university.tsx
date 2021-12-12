import orderBy from 'lodash/orderBy'
import axios from 'axios'
import { useState } from 'react'
import {
  University,
  UniversityFilterType,
  UniversitySortType,
} from '../types/university'

const UNIVERSITY_API_URL = 'http://universities.hipolabs.com/search'

export const useUniversities = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [favoriteUniversities, setFavoriteUniversities] = useState<
    University[]
  >([])
  const [visibleUniversities, setVisibleUniversities] = useState<University[]>(
    []
  )

  const fetchUniversities = async (
    filter?: UniversityFilterType,
    sort: UniversitySortType = { field: '', type: 'asc' }
  ) => {
    try {
      setLoading(true)
      const { data } = await axios.get(UNIVERSITY_API_URL, { params: filter })
      const sortedUniversities: University[] = orderBy(
        data,
        [sort.field],
        [sort.type]
      )
      setUniversities(sortedUniversities)
      // set initial visible data
      setVisibleUniversities(sortedUniversities.slice(0, 20))
    } catch (err) {
      setUniversities([])
    } finally {
      setLoading(false)
    }
  }

  const sortUniversities = (
    sort: UniversitySortType = { field: '', type: 'asc' }
  ) => {
    const sortedUniversities = orderBy(universities, [sort.field], [sort.type])
    setUniversities(sortedUniversities)
    setVisibleUniversities(sortedUniversities.slice(0, 20))
  }

  const loadMoreUniversities = () => {
    setVisibleUniversities(
      universities.slice(0, visibleUniversities.length + 20)
    )
  }

  const addToFavorite = async (university: University) => {
    const { data: res } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/favorite-universities`,
      {
        university,
      }
    )
    setFavoriteUniversities([...favoriteUniversities, res.data])
  }

  const fetchFavoriteUniversities = async () => {
    try {
      const { data: res } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/favorite-universities`
      )
      setFavoriteUniversities(res.data)
    } catch (_err) {
      setFavoriteUniversities([])
    }
  }

  return {
    total: universities.length,
    loading,
    fetchUniversities,
    loadMoreUniversities,
    visibleUniversities,
    sortUniversities,
    addToFavorite,
    favoriteUniversities,
    fetchFavoriteUniversities,
  }
}
