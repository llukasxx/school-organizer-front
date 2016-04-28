/* @flow */
import React, { Component } from 'react'

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
                <li><a>Signed in as teacher<b></b></a></li>
                <li>
                  <a>
                    <span className="label label-danger"><b>Log out</b></span>
                  </a>
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

export default TeacherDashboard
