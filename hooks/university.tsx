import axios from 'axios'
import { useState } from 'react'
import { University, UniversityFilterType } from '../types/university'

const UNIVERSITY_API_URL = 'http://universities.hipolabs.com/search'

export const useUniversities = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [visibleUniversities, setVisibleUniversities] = useState<University[]>(
    []
  )

  const fetchUniversities = async (filter?: UniversityFilterType) => {
    try {
      setLoading(true)
      const { data } = await axios.get(UNIVERSITY_API_URL, { params: filter })
      setUniversities(data)
      // set initial visible data
      setVisibleUniversities(data.slice(0, 20))
    } catch (err) {
      setUniversities([])
    } finally {
      setLoading(false)
    }
  }

  const loadMoreUniversities = () => {
    setVisibleUniversities(
      universities.slice(0, visibleUniversities.length + 20)
    )
  }

  return {
    total: universities.length,
    loading,
    fetchUniversities,
    loadMoreUniversities,
    visibleUniversities,
  }
}
