import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/LessonsReducer'

import StudentLessonMenu from '../../components/StudentLessonMenu'
import StudentTeacherListItem from '../../components/StudentLessons/StudentTeacherListItem'



export class StudentLessonInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {activeTab: 'lessonDates'}
    this.changeTab = this.changeTab.bind(this)
    this.renderItems = this.renderItems.bind(this)
    this.renderLessonDates = this.renderLessonDates.bind(this)
    this.renderGrades = this.renderGrades.bind(this)
    this.renderClassmates = this.renderClassmates.bind(this)
  }
  changeTab(tab) {
    this.setState({activeTab: tab})
  }
  renderLessonDates() {
    const { lessonDates } = this.props
    let ldArrayElements = []
    if(lessonDates && lessonDates.length > 0) {
      lessonDates.map((el) => {
        ldArrayElements.push(<li className="list-group-item"
                                 key={el.id}>
                               {el.date}
                             </li>)
      })
    } else {
      return 'No lesson dates.'
    }
    return (
      <ul className="list-group">
        {ldArrayElements}
      </ul>
    )
  }
  renderGrades() {
    const { studentGrades } = this.props
    let gradesLiArray = []
    if(studentGrades.length > 0) {
      studentGrades.map((el) => {
        gradesLiArray.push(<li className="list-group-item"
                               key={el.id}><b>Grade:</b> {el.grade}, {el.description}</li>)
      })
    } else {
      return 'No grades yet.'
    }
    return gradesLiArray
  }
  renderClassmates() {
    const { students, teachers } = this.props
    let teachersLI = []
    let studentsLI = []
    teachers.map((teacher) => {
      teachersLI.push(<StudentTeacherListItem 
                        key={teacher.id}
                        user={teacher}/>)
    })
    students.map((student) => {
      studentsLI.push(<StudentTeacherListItem 
                        key={student.id}
                        user={student}/>)
    })
    return (
      <div>
        <h4><p style={{marginLeft: '5px'}}>Teacher(s):</p></h4>
        {teachersLI}
        <h4><p style={{marginLeft: '5px'}}>Students:</p></h4>
        {studentsLI}
      </div>
    )
  }
  renderItems() {
    switch(this.state.activeTab) {
      case 'lessonDates':
        return this.renderLessonDates()
      case 'grades':
        return this.renderGrades()
      case 'classmates':
        return this.renderClassmates()
      default:
        return this.renderLessonDates()
    }
  }
  render() {
    const { activeLesson, loaded } = this.props

    return (
      <div className="col-md-5">
        <div className="panel panel-primary">
          <div className="panel-heading">Lesson Info</div>
          <div className="panel-body">
            <h3>
              <p className="text-center">
                <b>{loaded ? activeLesson.name : 'Loading...'}</b>
              </p>
            </h3>
          </div>
          <StudentLessonMenu 
            activeTab = {this.state.activeTab}
            changeTab = {this.changeTab}/>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeLesson: state.lessons.activeLesson,
    loaded: state.lessons.loaded
  }
}

export default connect(
  mapStateToProps,
  actions
)(StudentLessonInfo)
