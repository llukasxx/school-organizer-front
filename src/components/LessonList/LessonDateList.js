import React, { Component } from 'react'
import LessonDateListItem from './LessonDateListItem'

class LessonDateList extends Component {
  constructor(props) {
    super(props)
    this.renderLessonDateListItem = this.renderLessonDateListItem.bind(this)
  }
  renderLessonDateListItem() {
    const dates = this.props.dates
    let datesList = []
    if(dates.length > 0) {
      dates.map((el, index) => {
        datesList.push(<LessonDateListItem 
                            date={el}
                            key={index}/>)
      })
      return datesList
    } else {
      return (
        <li className="list-group-item">No dates</li>
      )
    }
  }
  render() {
    return (
      <div>
        {this.renderLessonDateListItem()}
      </div>
    )
  }
}

export default LessonDateList