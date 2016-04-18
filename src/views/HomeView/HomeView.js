/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'


export class HomeView extends Component {
  render () {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-xs-2 col-xs-offset-5'>
          </div>
        </div>
        <h1>Welcome to the React Redux Starter Kit</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect((mapStateToProps), {
  increment: () => increment(1),
  doubleAsync
})(HomeView)
