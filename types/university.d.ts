export type UniversityFilterType = {
  name: string
  country: string
}

export type UniversitySortType = {
  field: string
  type: 'desc' | 'asc'
}

export type University = {
  alpha_two_code: string
  country: string
  domains: string[]
  name: string
  'state-province': string | null
  web_pages: string[]
}

export enum SortBy {
  DEFAULT = '',
  NAME = 'name',
  COUNTRY = 'country',
}
