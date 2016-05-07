import React, { Component } from 'react'
import LessonStudentListItem from './LessonStudentListItem'
import _ from 'lodash'

class LessonStudentList extends Component {
  constructor(props) {
    super(props)
    this.renderLessonStudentListItem = this.renderLessonStudentListItem.bind(this)
    this.handleGradeChange = this.handleGradeChange.bind(this)
    this.resetGrades = this.resetGrades.bind(this)
  }
  renderLessonStudentListItem() {
    const students = this.props.students
    let studentList = []
    if(students.length > 0) {
      students.map((el, index) => {
        studentList.push(<LessonStudentListItem 
                            student={el}
                            key={index}
                            display={this.props.display}
                            lessonId={this.props.lessonId}
                            handleGradeChange={this.handleGradeChange}/>)
      })
      return studentList
    } else {
      return (
        <li className="list-group-item">No students found</li>
      )
    }
  }
  handleGradeChange(student_id, grade) {
    let newGrades = this.state.grades
    let gradeIndex = _.findIndex(newGrades, function(o) { return o.student_id == student_id })
    newGrades[gradeIndex]['grade'] = grade
    this.setState({grades: newGrades})
    console.log(this.state)
  }
  resetGrades() {
    let grade = {
      lesson_id: this.props.lessonId,
      grade: ''
    }
    let grades = []
    this.props.students.map(function(el) {
      grades.push(Object.assign({student_id: el.id}, grade))
    })
    this.setState({grades: grades})
  }
  componentWillMount() {
    this.resetGrades()
  }
  componentWillReceiveProps() {
    this.resetGrades()
  }
  render() {
    return (
      <div>
        {this.renderLessonStudentListItem()}
        <br />
        {this.props.display == 'addGrades' ? <button className="btn btn-lg btn-success">Confirm all</button> : '' }
      </div>
    )
  }
}

export default LessonStudentList