/* @flow */
import React, { Component } from 'react'
import SignIn from '../../forms/SignInForm'

export class HomeView extends Component {
  render () {
    return (
      <div className="col-md-6 col-md-offset-3">  
        <SignIn />
      </div>
    )
  }
}

export default HomeView
