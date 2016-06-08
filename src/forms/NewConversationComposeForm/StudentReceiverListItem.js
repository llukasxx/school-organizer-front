import React, { Component } from 'react'

class StudentReceiverListItem extends Component {
  constructor(props) {
    super(props)
    this.renderGroups = this.renderGroups.bind(this) 
  }
  renderGroups() { 
    const { groups } = this.props
    let groupsNames = []
    if(groups && groups.length > 0) {
      groups.map((el) => {
        groupsNames.push(el.name)
      })
    } else {
      return "No groups"
    }
    return groupsNames
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
              <p>Group(s): {this.renderGroups()}</p>
            </div>
          </div>
        </li>
    )
  }
}

export default StudentReceiverListItem