import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import MySpinner from '../../components/Spinner/Spinner'
import { smallSpinnerRight } from '../../utils/SpinnerConfig'

import LessonList from './LessonList'

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
          {this.props.loaded && this.props.activeGroup ?
            <table className="table">
              <thead>
                <tr><th>Group name: {this.props.activeGroup.name}</th></tr>
                <tr>
                  <th>
                    <ul className="nav nav-tabs">
                      <li role="presentation" 
                        className={this.state.activeTab == "dates" ? "active" : ""}
                        onClick = {() => {this.changeActiveTab('dates')}}
                        id="lessonDates">
                        <a style={{cursor: 'pointer'}}>Dates</a>
                      </li>
                      <li role="presentation"
                        className={this.state.activeTab == "students" ? "active" : ""}
                        onClick = {() => {this.changeActiveTab('students')}}
                        id="studentList">
                        <a style={{cursor: 'pointer'}}>Students</a>
                      </li>
                    </ul>
                  </th>
                </tr>
              </thead>
                <tbody>
                <tr>
                  <td>
                    <LessonList 
                      lessons={this.props.activeGroup.lessons}
                      activeTab={this.state.activeTab}/>
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

const mapStateToProps = (state) => {
  return {
    activeGroup: state.teacherGroups.activeGroup,
    loaded: state.teacherGroups.loaded
  }
}

export default connect(mapStateToProps, null)(TeacherGroupInfo)

