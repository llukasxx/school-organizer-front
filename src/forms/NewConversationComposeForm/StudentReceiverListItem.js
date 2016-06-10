import React, { Component } from 'react'
import AdditionHighlight from './AdditionHighlight'

class StudentReceiverListItem extends Component {
  constructor(props) {
    super(props)
    this.renderGroups = this.renderGroups.bind(this) 
    this.state = {hovering: false}
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
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
  mouseEnter() {
    this.setState({hovering: true})
  }
  mouseLeave() {
    this.setState({hovering: false})
  }
  render() {
    const {student} = this.props
    return (
      <div className="col-md-6">
        <li onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
          className={this.state.hovering ? "list-group-item active" : "list-group-item"}>
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
          <AdditionHighlight active={this.state.hovering}/>
        </li>
      </div>
    )
  }
}

export default StudentReceiverListItem