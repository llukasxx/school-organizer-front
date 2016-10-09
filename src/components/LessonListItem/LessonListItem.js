import React from 'react'

export class LessonListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    const { lesson, changeActiveLesson, activeLesson } = this.props
    console.log(lesson, activeLesson)
    return (
      <li className={`list-group-item ${lesson.id == activeLesson.id ? 'active': ''}`} 
          style={{cursor: 'pointer'}}
          onClick={(e) => {
            e.preventDefault()
            changeActiveLesson(lesson)
          }}>
        {lesson.name}<span className="glyphicon glyphicon-chevron-right pull-right"/>
      </li>
    )
  }
}

export default LessonListItem

