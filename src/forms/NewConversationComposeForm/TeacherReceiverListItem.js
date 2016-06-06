import React, { Component } from 'react'

class TeacherReceiverListItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { teacher } = this.props
    return (
        <li className="list-group-item">
          <div className="media" style={{cursor: 'pointer'}}>
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="https://media-3.haircrazy.com/avatars/no_avatar.png"/>
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{ teacher.firstName + ' ' + teacher.lastName }</h4>
              <p>Lessons: to be listed</p>
            </div>
          </div>
        </li>
    )
  }
}

export default TeacherReceiverListItem