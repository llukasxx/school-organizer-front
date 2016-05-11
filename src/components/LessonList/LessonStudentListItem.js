import React, { Component } from 'react'
import MultiGradeForm from '../../forms/GradeForm'
import IndvGradeForm from '../../forms/IndvGradeForm'
import EditGradeForm from '../../forms/EditGradeForm'

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
    this.renderEditGrades = this.renderEditGrades.bind(this)
    this.extractProperGrades = this.extractProperGrades.bind(this)
  }
  renderGradeForm() {
    const id = this.props.student.id
    return (
      <MultiGradeForm 
        key={id}
        formKey={String(id)}
        gradesDescription={this.props.gradesDescription}
      />
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
    const id = this.props.student.id
    return (
      <IndvGradeForm 
        key={id}
        formKey={String(id)}
        resetState={this.resetState}
      />
    )
  }
  renderShowGrades() {
    let currentGrades = this.extractProperGrades()
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
  renderEditGrades() {
    let currentGrades = this.extractProperGrades()
    let gradeForms = []
    currentGrades.map((el, index) => {
      gradeForms.push(
        <EditGradeForm
          key={el.id} 
          grade={el}
          formKey={String(el.id)}
          initialValues={{grade: el.grade, description: el.description}}
          lastItem={currentGrades.length == (index+1) ? true : false}
          resetParent={this.resetState}/>
      )
    })
    if(gradeForms.length > 0) {
      return gradeForms
    } else {
      return (
        <div>
          No grades found.
          <button 
            className="btn btn-warning"
            onClick={(e) => {
              e.preventDefault()
              this.resetState()
            }}>Go back</button>
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
  extractProperGrades() {
    const currentLessonId = this.props.lessonId
    let currentGrades = []
    this.props.student.student_grades.map(function(el) {
      const gradeLessonId = el.lesson_id 
      if(currentLessonId == gradeLessonId) {
        currentGrades.push(el)
      }
    })
    return currentGrades
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
          } else if(editGrade) {
            toRender = this.renderEditGrades
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