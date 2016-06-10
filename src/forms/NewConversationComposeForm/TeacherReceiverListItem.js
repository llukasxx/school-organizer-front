import React, { Component } from 'react'
import AdditionHighlight from './AdditionHighlight'

class TeacherReceiverListItem extends Component {
  constructor(props) {
    super(props)
    this.renderLessons = this.renderLessons.bind(this)
    this.state = {hovering: false}
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }
  renderLessons() {
    const { lessons } = this.props
    let lessonsNames = []
    if(lessons && lessons.length > 0) {
      lessons.map((el, index) => {
        if(lessons[index] == lessons[lessons.length-1]) {
          lessonsNames.push(el.name)
        } else {
          lessonsNames.push(el.name + ', ')
        }
      })
    } else {
      return "No lessons"
    }
    return lessonsNames
  }
  mouseEnter() {
    this.setState({hovering: true})
  }
  mouseLeave() {
    this.setState({hovering: false})
  }
  render() {
    const { teacher } = this.props
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
              <h4 className="media-heading">{ teacher.firstName + ' ' + teacher.lastName }</h4>
              <p>Lessons: {this.renderLessons()}</p>
            </div>
          </div>
          <AdditionHighlight active={this.state.hovering}/>
        </li>
      </div>
    )
  }
}

export default TeacherReceiverListItem