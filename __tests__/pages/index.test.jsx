/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, act } from '@testing-library/react'
import Home from '../../pages'

const mockSession = {
  user: {
    image: null,
    name: "John",
    email: "john@email.com",
  },
  expires: 123213139,
}

const useUniversities = () => ({
  loading: false,
  fetchUniversities: jest.fn(),
  loadMoreUniversities: jest.fn(),
  sortUniversities: jest.fn(),
  visibleUniversities: [],
  total: 0,
  addToFavorite: jest.fn(),
  favoriteUniversities: [],
  fetchFavoriteUniversities: jest.fn(),
})

jest.mock('../../hooks/university', () => ({
  useUniversities
}));

jest.mock('rc-menu', () => () => <div>rc-menu-mock</div>)
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: mockSession,
    status: 'loading'
  }))
}))
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '',
    query: {},
    push: jest.fn()
  }))
}))

describe('Home', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Home />)
    expect(asFragment()).toMatchSnapshot()
  })
})
