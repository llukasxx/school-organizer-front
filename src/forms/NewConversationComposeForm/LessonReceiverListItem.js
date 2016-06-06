import React, { Component } from 'react'

class LessonReceiverListItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {lesson} = this.props
    return (
        <li className="list-group-item">
          <div className="media" style={{cursor: 'pointer'}}>
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="https://media-3.haircrazy.com/avatars/no_avatar.png"/>
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{lesson.name}</h4>
              <p>Lesson itd: a</p>
            </div>
          </div>
        </li>
    )
  }
}

export default LessonReceiverListItem