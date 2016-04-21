/* @flow */
import React, { Component } from 'react'
import Signin from '../../containers/Auth/Signin'

export class HomeView extends Component {
  render () {
    return (
      <div className="col-md-6 col-md-offset-3">  
        <Signin />
      </div>
    )
  }
}

export default HomeView
