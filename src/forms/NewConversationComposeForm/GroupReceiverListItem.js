import React, { Component } from 'react'
import AdditionHighlight from './AdditionHighlight'

class GroupReceiverListItem extends Component {
  constructor(props) {
    super(props)
    this.renderLessons = this.renderLessons.bind(this)
    this.state = {hovering: false}
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }
  renderLessons() {
    const { lessons } = this.props
    let lessonNames = []
    if(lessons && lessons.length > 0) {
      lessons.map((el, index) => {
        if(lessons[index] == lessons[lessons.length - 1]) {
          lessonNames.push(el.name)
        } else {
          lessonNames.push(el.name + ', ')
        }
      })
    } else {
      return "No lessons"
    }
    return lessonNames
  }
  mouseEnter() {
    this.setState({hovering: true})
  }
  mouseLeave() {
    this.setState({hovering: false})
  }
  render() {
    const {group} = this.props
    return (
      <div className="col-md-6">
        <li onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
          className={this.state.hovering ? "list-group-item active" : "list-group-item"}
          onClick={(e) => {
            this.props.changeReceiver(Object.assign({}, group, {type: 'group'}), this.props.index)
          }}>
          <div className="media active" style={{cursor: 'pointer'}}>
            <div className="media-left">
              <a>
                <img className="media-object" src="https://media-3.haircrazy.com/avatars/no_avatar.png"/>
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{group.name}</h4>
              <p>
                Lessons: {this.renderLessons()} <br /> 
                Students assigned: {this.props.totalStudents}
              </p>
            </div>
          </div>
          <AdditionHighlight active={this.state.hovering}/>
        </li>
      </div>
    )
  }
}

export default GroupReceiverListItem