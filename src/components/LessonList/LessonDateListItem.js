import React, { Component } from 'react'

class LessonDateListItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <li className="list-group-item">
        {this.props.date.date}
      </li>
    )
  }
}

export default LessonDateListItem