import React, { Component } from 'react'
import MultiGradeForm from '../../forms/GradeForm'
import IndvGradeForm from '../../forms/IndvGradeForm'
import EditGradeForm from '../../forms/EditGradeForm'

import {toastr} from 'react-redux-toastr'

import { connect } from 'react-redux'
import * as actions from '../../redux/modules/GroupsReducer'

import { studentLessonGradesArraySelector } from '../../selectors/GroupsSelector'

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
  }
  renderGradeForm() {
    const id = this.props.student.id
    return (
      <MultiGradeForm 
        key={id}
        formKey={String(id)}
        lastItem={this.props.lastStudentItem}
        handleStudentDisplay={this.props.handleStudentDisplay}
        lessonId={this.props.lessonId}
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
        studentId={id}
        lessonId={this.props.lessonId}
      />
    )
  }
  renderShowGrades() {
    const currentGrades = this.props.grades
    let grades = []
    if(currentGrades.length > 0) {
      currentGrades.map((el) => {
        grades.push(<p key={el.id}>{el.description}, {el.grade}</p>)    
      })
      return grades
    } else {
      return (
        <div>
          No grades found.
        </div>
      )
    }
  }
  renderEditGrades() {
    let { grades } = this.props
    let gradeForms = []
    grades.map((el, index) => {
      gradeForms.push(
        <EditGradeForm
          key={el.id} 
          grade={el}
          formKey={String(el.id)}
          initialValues={{grade: el.grade, description: el.description}}
          lastItem={grades.length == (index+1) ? true : false}
          firstItem={index == 0 ? true : false}
          resetParent={this.resetState}
          studentId={this.props.student.id}
          lessonId={this.props.lessonId}/>
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
        key={this.props.student.id}
        style={indvGrade || editGrade || sendMessage ? {border: 'solid'} : {}}>
        <b>{this.props.student.firstName + ' ' + this.props.student.lastName}</b>

        {toRender()}
      </li>
    )
  }
}

const makeMapStateToProps = () => {
  const getStudentLessonGradesArraySelector = studentLessonGradesArraySelector()
  const mapStateToProps = (state, ownProps) => {
    return {
      grades: getStudentLessonGradesArraySelector(state, ownProps)
    }
  }
  return mapStateToProps
}


export default connect(makeMapStateToProps, actions)(LessonStudentListItem)