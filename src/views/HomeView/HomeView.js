/* @flow */
import React, { Component } from 'react'
import LoginForm from '../../containers/LoginForm'

export class HomeView extends Component {
  render () {
    return (
      <div className="col-md-6 col-md-offset-3">  
        <LoginForm />
      </div>
    )
  }
}

export default HomeView
