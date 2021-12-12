/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import FavoriteUniversityList from '../../components/FavoriteUniversityList'

const mockSession = {
  user: {
    image: null,
    name: "John",
    email: "john@email.com",
  },
  expires: 123213139,
}

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: mockSession,
    status: 'loading'
  }))
}))

describe('FavoriteUniversityList', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<FavoriteUniversityList />)
    expect(asFragment()).toMatchSnapshot()
  })
})
