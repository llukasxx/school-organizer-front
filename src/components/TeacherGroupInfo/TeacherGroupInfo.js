import React from 'react'

import MySpinner from '../Spinner/Spinner'
import { smallSpinnerRight } from '../../utils/SpinnerConfig'

import LessonList from '../LessonList'

export class TeacherGroupInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activeTab: 'dates' }
    this.changeActiveTab = this.changeActiveTab.bind(this)
  }
  changeActiveTab(tab) {
    this.setState({activeTab: tab})
  }
  render () {
    return (
      <div className="col-md-5 col-sm-6">
        <div className="panel panel-info">
          <div className="panel-heading">
            Group Info
            <div className="pull-right">
              {this.props.loaded ? "" : <MySpinner opts={smallSpinnerRight}/>}
            </div>
          </div>
          <div className="panel-body">
          {this.props.loaded ?
            <table className="table">
              <thead>
                <tr><th>Group name: {this.props.activeGroup.name}</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button 
                      onClick = {() => {this.changeActiveTab('dates')}}
                      className="btn btn-warning"
                      id="lessonDates">
                      Dates:
                    </button>
                    <button 
                      onClick = {() => {this.changeActiveTab('students')}}
                      className="btn btn-success"
                      id="studentList">
                      Students:
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <LessonList lessons={this.props.activeGroup.lessons} activeTab={this.state.activeTab}/>
                  </td>
                </tr>
              </tbody>
            </table>
            : "loading..."}
          </div>
        </div>
      </div>
    )
  }
}

export default TeacherGroupInfo

