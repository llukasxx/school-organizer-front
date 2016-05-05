import React, { Component } from 'react'

class LessonStudentListItem extends Component {
  constructor(props) {
    super(props)
  }
  renderGradeForm() {
    return (
        <form style={{display: 'inline', margin: 0, padding: 0}}>
          <input type="text" 
            className="form-control input-sm pull-right"
            style={{width: '3em', height: '2.5em', display: 'inline'}}/>
        </form>
    )
  }
  renderActionIcons() {
    return (
      <div className="pull-right">
        <span title="Add grade" style={{width: '1.5em', cursor: 'pointer'}} className="glyphicon glyphicon-plus" />
        <span title="Edit grades" style={{width: '1.5em', cursor: 'pointer'}} className="glyphicon glyphicon-pencil" />
        <span title="Send message" style={{width: '1.5em', cursor: 'pointer'}} className="glyphicon glyphicon-envelope" />
      </div>
    )
  }
  render() {
    let toRender;
    switch(this.props.display) {
      case 'none':
        toRender = this.renderActionIcons;
        break;
      case 'addGrades':
        toRender = this.renderGradeForm;
        break;
      default:
        toRender = this.renderActionIcons;
    }
    return (
      <li 
        className="list-group-item"
        key={this.props.student.id}>
        {this.props.student.first_name + ' ' + this.props.student.last_name}
        {toRender()}
      </li>
    )
  }
}

export default LessonStudentListItem