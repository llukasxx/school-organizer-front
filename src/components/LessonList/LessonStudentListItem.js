import React, { Component } from 'react'

class LessonStudentListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {display: {indvGrade: false, editGrade: false, sendMessage: false}}
    this.renderActionIcons = this.renderActionIcons.bind(this)
    this.renderGradeForm = this.renderGradeForm.bind(this)
    this.renderIndvGrade = this.renderIndvGrade.bind(this)
    this.renderShowGrades = this.renderShowGrades.bind(this)
    this.resetState = this.resetState.bind(this)
    this.toggleIndvState = this.toggleIndvState.bind(this)
  }
  renderGradeForm() {
    return (
      <div className="input-group">
        <form style={{display: 'inline', margin: 0, padding: 0}}>
          <span className="input-group-addon" id="basic-addon1">Grade:</span>
          <input type="text" 
            className="form-control input-sm pull-right"
            style={{width: '5em', height: '2.3em', display: 'inline'}}
            onChange={(e) => {
              let value = e.target.value
              this.props.handleGradeChange(this.props.student.id, value)
            }}/>
        </form>
      </div>
    )
  }
  renderActionIcons() {
    return (
      <div className="pull-right">
        <span 
          title="Add grade" 
          style={{width: '1.5em', cursor: 'pointer'}} 
          className="glyphicon glyphicon-plus" 
          onClick={() => {this.toggleIndvState({indvGrade: true})}}/>
        <span 
          title="Edit grades" 
          style={{width: '1.5em', cursor: 'pointer'}} 
          className="glyphicon glyphicon-pencil" 
          onClick={() => {this.toggleIndvState({editGrade: true})}}/>
        <span 
          title="Send message" 
          style={{width: '1.5em', cursor: 'pointer'}} 
          className="glyphicon glyphicon-envelope" 
          onClick={() => {this.toggleIndvState({sendMessage: true})}}/>
      </div>
    )
  }
  renderIndvGrade() {
    return (
        <form style={{margin: 0, padding: 0}}>
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">Description:</span>
            <input type="text" 
              placeholder="eg. test"
              className="form-control input-sm"
              style={{width: '10em', height: '2.5em'}}/>
          </div>
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">Grade:</span>
            <input type="text" 
              placeholder="eg. 5"
              className="form-control input-sm"
              style={{width: '5em', height: '2.5em'}}/>
          </div>
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
    this.setState(
      {display: {
        indvGrade: false,
        editGrade: false,
        sendMessage: false
      }})
  }
  toggleIndvState(newState) {
    let defaultState = {indvGrade: false, editGrade: false, sendMessage: false}
    let updatedState = Object.assign(defaultState, newState)
    this.setState({display: updatedState})
  }
  componentWillReceiveProps(nextProps) {
    this.resetState()
  }
  render() {
    let toRender;
    const {indvGrade, editGrade, sendMessage} = this.state.display
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