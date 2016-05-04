import React from 'react'

import LessonStudentList from './LessonStudentList'

export class LessonListItem extends React.Component {
  constructor(props) {
    super(props)
    this.renderLessonDates = this.renderLessonDates.bind(this)
    this.renderLessonStudents = this.renderLessonStudents.bind(this)
  }
  renderLessonDates() {
    return ('yo')
  }
  renderLessonStudents() {
    return (
      <LessonStudentList 
        students={this.props.lesson.students}
      />
    )
  }
  render () {
    return (
      <div>
        <h4>{this.props.lesson.name}</h4>
        <ul className="list-group">
          {this.props.activeTab == 'dates' ? this.renderLessonDates() : this.renderLessonStudents()}
        </ul>
      </div>
    )
  }
}

export default LessonListItem

