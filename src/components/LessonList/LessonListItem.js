import React from 'react'

import LessonStudentList from './LessonStudentList'
import LessonDateList from './LessonDateList'

export class LessonListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {lessonStudentDisplay: 'none'}
    this.renderLessonDates = this.renderLessonDates.bind(this)
    this.renderLessonStudents = this.renderLessonStudents.bind(this)
    this.handleStudentDisplay = this.handleStudentDisplay.bind(this)
  }
  renderLessonDates() {
    return (
      <LessonDateList 
        dates={this.props.lesson.lesson_dates}/>
    )
  }
  renderLessonStudents() {
    return (
      <div>
        <button 
          className="btn btn-primary"
          onClick={() => {this.handleStudentDisplay('addGrades')}}>
          {this.state.lessonStudentDisplay == 'addGrades' ? "Hide" : "Add grades"}
        </button>
        <button 
          className="btn btn-info pull-right"
          onClick={() => {this.handleStudentDisplay('showGrades')}}>
          {this.state.lessonStudentDisplay == 'showGrades' ? "Hide" : "Show grades"}
        </button>
        <LessonStudentList 
          students={this.props.lesson.students}
          display={this.state.lessonStudentDisplay}
          lessonId={this.props.lesson.id}
        />
      </div>
    )
  }
  handleStudentDisplay(toggle) {
    if(this.state.lessonStudentDisplay == toggle) {
      this.setState({
        lessonStudentDisplay: 'none'
      })
    } else {
      this.setState({
        lessonStudentDisplay: toggle
      })
    }
  }
  render () {
    return (
      <div>
        <div>
          <h4>{this.props.lesson.name}</h4>
        </div>
        <ul className="list-group">
          {this.props.activeTab == 'dates' ? this.renderLessonDates() : this.renderLessonStudents()}
          <br />
        </ul>
      </div>
    )
  }
}

export default LessonListItem

