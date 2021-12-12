/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import Subscription from '../../pages/subscription'

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

describe('Subscription', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Subscription />)
    expect(asFragment()).toMatchSnapshot()
  })
})
