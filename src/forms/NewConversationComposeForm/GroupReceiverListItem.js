import React, { Component } from 'react'

class GroupReceiverListItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {group} = this.props
    return (
        <li className="list-group-item">
          <div className="media" style={{cursor: 'pointer'}}>
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="https://media-3.haircrazy.com/avatars/no_avatar.png"/>
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{group.name}</h4>
              <p>Lessons: tbl, students count: tbl</p>
            </div>
          </div>
        </li>
    )
  }
}

export default GroupReceiverListItem