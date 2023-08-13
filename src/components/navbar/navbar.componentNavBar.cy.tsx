import React from 'react'
import NavBar from './navbar.component'

describe('<NavBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NavBar />)
  })
})