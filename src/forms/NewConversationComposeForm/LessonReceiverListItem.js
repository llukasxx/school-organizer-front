import React, { Component } from 'react'

class LessonReceiverListItem extends Component {
  constructor(props) {
    super(props)
    this.renderGroups = this.renderGroups.bind(this)
  }
  renderGroups() {
    const { groups } = this.props
    let groupNames = []
    if(groups && groups.length > 0) {
      groups.map((el, index) => {
        if(groups[index] == groups[groups.length - 1]) {
          groupNames.push(el.name)
        } else {
          groupNames.push(el.name + ', ')
        }
      })
    } else {
      return "No groups"
    }
    return groupNames
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
              <p>
                Group(s): {this.renderGroups()}<br />
                Students attending: {this.props.totalStudents}
              </p>
            </div>
          </div>
        </li>
    )
  }
}

export default LessonReceiverListItem