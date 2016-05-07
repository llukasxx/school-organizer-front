import React, { Component } from 'react'

class LessonStudentListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {indvGrade: false, editGrade: false, sendMessage: false}
    this.renderActionIcons = this.renderActionIcons.bind(this)
    this.renderGradeForm = this.renderGradeForm.bind(this)
    this.renderIndvGrade = this.renderIndvGrade.bind(this)
    this.renderShowGrades = this.renderShowGrades.bind(this)
    this.resetState = this.resetState.bind(this)
  }
  renderGradeForm() {
    return (
        <form style={{display: 'inline', margin: 0, padding: 0}}>
          <input type="text" 
            className="form-control input-sm pull-right"
            style={{width: '3em', height: '2.5em', display: 'inline'}}
            onChange={(e) => {
              let value = e.target.value
              this.props.handleGradeChange(this.props.student.id, value)
            }}/>
        </form>
    )
  }
  renderActionIcons() {
    return (
      <div className="pull-right">
        <span 
          title="Add grade" 
          style={{width: '1.5em', cursor: 'pointer'}} 
          className="glyphicon glyphicon-plus" 
          onClick={() => {this.setState({indvGrade: true})}}/>
        <span 
          title="Edit grades" 
          style={{width: '1.5em', cursor: 'pointer'}} 
          className="glyphicon glyphicon-pencil" 
          onClick={() => {this.setState({editGrade: true})}}/>
        <span 
          title="Send message" 
          style={{width: '1.5em', cursor: 'pointer'}} 
          className="glyphicon glyphicon-envelope" 
          onClick={() => {this.setState({sendMessage: true})}}/>
      </div>
    )
  }
  renderIndvGrade() {
    return (
      <form style={{margin: 0, padding: 0}}>
          <input type="text" 
            placeholder="description"
            className="form-control input-sm"
            style={{width: '10em', height: '2.5em'}}/>
          <input type="text" 
            placeholder="grade"
            className="form-control input-sm"
            style={{width: '5em', height: '2.5em'}}/>
          <br />
          <button className="btn btn-sm btn-success">Confirm</button> | <button 
                                                                          className="btn btn-sm btn-danger"
                                                                          onClick={(e) => {
                                                                            e.preventDefault()
                                                                            this.resetState()
                                                                          }}>
                                                                          Cancel</button>
        </form>
    )
  }
  renderShowGrades() {
    const currentLessonId = this.props.lessonId
    let currentGrades = []
    this.props.student.student_grades.map(function(el) {
      const gradeLessonId = el.lesson_id 
      if(currentLessonId == gradeLessonId) {
        currentGrades.push(el.grade)
      }
    })
    if(currentGrades.length > 0) {
      return (
        <div>
          {currentGrades.join(', ')}
        </div>
      )
    } else {
      return (
        <div>
          No grades
        </div>
      )
    }
  }
  resetState() {
    this.setState({
      indvGrade: false,
      editGrade: false,
      sendMessage: false
    })
  }
  componentWillReceiveProps(nextProps) {
    this.resetState()
  }
  render() {
    let toRender;
    const {indvGrade, editGrade, sendMessage} = this.state
    switch(this.props.display) {
      case 'none':
        toRender = this.renderActionIcons;
        if(indvGrade || editGrade || sendMessage) {
          if(indvGrade) {
            toRender = this.renderIndvGrade
          }
        }
        break;
      case 'addGrades':
        toRender = this.renderGradeForm;
        break;
      case 'showGrades':
        toRender = this.renderShowGrades;
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