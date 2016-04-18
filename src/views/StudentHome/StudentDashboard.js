import React, { Component } from 'react'

export class StudentDashboard extends Component {
  render () {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
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
              <li><a>Signed in as student<b></b></a></li>
              <li>
                <a>
                  <span className="label label-danger"><b>Log out</b></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default StudentDashboard
