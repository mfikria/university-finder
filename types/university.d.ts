export type UniversityFilterType = {
  name: string
  country: string
}

export type University = {
  alpha_two_code: string
  country: string
  domains: string[]
  name: string
  'state-province': string | null
  web_pages: string[]
}
