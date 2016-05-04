import React, { Component } from 'react'

class LessonStudentListItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <li 
        className="list-group-item"
        key={this.props.student.id}>
        {this.props.student.first_name}
      </li>
    )
  }
}

export default LessonStudentListItem