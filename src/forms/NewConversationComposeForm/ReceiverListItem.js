import React, { Component } from 'react'

class ReceiverListItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {student} = this.props
    return (
        <li className="list-group-item">
          <div className="media" style={{cursor: 'pointer'}}>
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="https://media-3.haircrazy.com/avatars/no_avatar.png"/>
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{student.firstName + ' ' + student.lastName}</h4>
              <p>Group: 1k411</p>
            </div>
          </div>
        </li>
    )
  }
}

export default ReceiverListItem