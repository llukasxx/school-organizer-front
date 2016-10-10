import React, { PropTypes } from 'react'

export class StudentLessonMenu extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { activeLesson } = this.props
    return (
      <ul className="nav nav-tabs">
        <li role="presentation" 
            className={this.props.activeTab == 'lessonDates' ? 'active' : ''}
            onClick={() => {this.props.changeTab('lessonDates')}}>
          <a>Lesson Dates</a>
        </li>
        <li role="presentation"
            className={this.props.activeTab == 'grades' ? 'active' : ''}
            onClick={() => {this.props.changeTab('grades')}}>
          <a>Grades</a>
        </li>
        <li role="presentation"
            className={this.props.activeTab == 'classmates' ? 'active' : ''}
            onClick={() => {this.props.changeTab('classmates')}}>
          <a>Classmates</a>
        </li>
      </ul>
    )
  }
}

export default StudentLessonMenu