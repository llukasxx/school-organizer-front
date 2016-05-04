import React from 'react'

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
    const students = this.props.lesson.students
    let studentList = []
    if(students.length > 0) {
      students.map((el) => {
        studentList.push(<li 
                          className="list-group-item"
                          key={el.id}>
                          {el.first_name}
                        </li>)
      })
      return studentList
    } else {
      return (
        <li className="list-group-item">No students found</li>
      )
    }
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

