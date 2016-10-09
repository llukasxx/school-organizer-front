import React from 'react'

export class LessonListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    const { lesson, changeActiveLesson, activeLesson } = this.props
    return (
      <li className={`list-group-item ${lesson.id == activeLesson.id ? 'active': ''}`} 
          style={{cursor: 'pointer'}}
          onClick={(e) => {
            e.preventDefault()
            changeActiveLesson(lesson)
          }}>
        {lesson.name}
      </li>
    )
  }
}

export default LessonListItem

