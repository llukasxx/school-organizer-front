import React from 'react'

export class LessonListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    const { lesson } = this.props
    return (
      <li className="list-group-item" style={{cursor: 'pointer'}}>
        {lesson.name}<span className="glyphicon glyphicon-chevron-right pull-right"/>
      </li>
    )
  }
}

export default LessonListItem

