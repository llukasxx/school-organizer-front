import React from 'react'
import { connect } from 'react-redux'

import { activeLessonsArraySelector } from '../../selectors/GroupsSelector'

import LessonListItem from './LessonListItem'

export class LessonList extends React.Component {
  constructor(props) {
    super(props)
    this.renderLessonListItem = this.renderLessonListItem.bind(this)
  }
  renderLessonListItem(el) {
    if(el) {
      return (
        <LessonListItem 
          key={el.name}
          lesson={el}
          activeTab={this.props.activeTab}
          />
      )
    }
  }
  render () {
    if(this.props.activeLessons.length > 0) {
      return (
        <div>
          {this.props.activeLessons.map(this.renderLessonListItem)}
        </div>
      )
    } else {
      return (
        <div>
          No Lessons found.
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeLessons: activeLessonsArraySelector(state, ownProps)
  }
}

export default connect(mapStateToProps, null)(LessonList)

