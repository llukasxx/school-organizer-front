import React, { Component } from 'react'
import AdditionHighlight from './AdditionHighlight'

class LessonReceiverListItem extends Component {
  constructor(props) {
    super(props)
    this.renderGroups = this.renderGroups.bind(this)
    this.state = {hovering: false}
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
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
  mouseEnter() {
    this.setState({hovering: true})
  }
  mouseLeave() {
    this.setState({hovering: false})
  }
  render() {
    const {lesson} = this.props
    return (
      <div className="col-md-6">
        <li onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
          className={this.state.hovering ? "list-group-item active" : "list-group-item"}
          onClick={(e) => {
            this.props.changeReceiver(Object.assign({}, lesson, {type: 'lesson'}), this.props.index)
          }}>
          <div className="media" style={{cursor: 'pointer'}}>
            <div className="media-left">
              <a>
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
          <AdditionHighlight active={this.state.hovering}/>
        </li>
      </div>
    )
  }
}

export default LessonReceiverListItem