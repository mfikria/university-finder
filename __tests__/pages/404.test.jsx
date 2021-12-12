/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import NotFound from '../../pages/404'

describe('NotFound', () => {

  it('should match snapshot', () => {
    const { asFragment } = render(<NotFound />)
    expect(asFragment()).toMatchSnapshot()
  })
})
