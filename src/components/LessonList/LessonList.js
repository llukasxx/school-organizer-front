import React from 'react'

import LessonListItem from './LessonListItem'

export class LessonList extends React.Component {
  constructor(props) {
    super(props)
    this.renderLessonListItem = this.renderLessonListItem.bind(this)
  }
  renderLessonListItem(el) {
    return(
      <LessonListItem 
        key={el.name}
        lesson={el}
        activeTab={this.props.activeTab}
        />
    )
  }
  render () {
    return (
      <div>
        {this.props.lessons.map(this.renderLessonListItem)}
      </div>
    )
  }
}

export default LessonList

