/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import Favorites from '../../pages/favorites'

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

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '',
    query: {},
    push: jest.fn()
  }))
}))

describe('Favorites', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Favorites />)
    expect(asFragment()).toMatchSnapshot()
  })
})
