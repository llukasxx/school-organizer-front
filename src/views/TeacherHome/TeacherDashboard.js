/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/AuthReducer'

export class TeacherDashboard extends Component {
  render () {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand"><b>Home</b></a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li>
                  <a>Groups</a>
                </li>
                <li>
                  <a>Events</a>
                </li>
                <li>
                  <a>Messages</a>
                </li>           
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a>Signed in as {this.props.currentUser} <button 
                                                            className="btn btn-sm btn-danger"
                                                            onClick={this.props.signOutUser}>Log out</button></a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, actions)(TeacherDashboard)
