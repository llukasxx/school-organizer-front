import React from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../redux/modules/GroupsReducer'

export const fields = ['grade', 'description']

const validate = (values) => {
  const errors = {}
  return errors
}

export class Grade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {gradesDescription: ""}
    this.extractGrades = this.extractGrades.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDisplay = this.handleDisplay.bind(this)
  }
  renderActionButtons() {
    return (
      <div>
        <hr />
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1">Grades description:</span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="eg. test" 
            aria-describedby="basic-addon1"
            onChange={(e) => {
              this.setState({gradesDescription: e.target.value})
            }}/>
        </div>
        <small>*leaving empty grade field wont add grade at all</small><br />
        <small>*description is required</small>
        <hr />
        <button 
          className="btn btn-lg btn-success"
          disabled={
            this.state.gradesDescription.length > 0 ? false : true
          }
          onClick={(e) => {
            e.preventDefault()
            this.handleSubmit()
          }}>
          Confirm all
        </button>
        <button 
          className="btn btn-lg btn-danger pull-right"
          onClick={(e) => {
            e.preventDefault()
            this.handleDisplay()
          }}>
          Cancel
        </button>
      </div>
    )
  }
  extractGrades(form = {}) {
    let grades = []
    Object.keys(form).map((studentId) => {
      if(form[studentId].grade.value.length > 0) {
        let grade = { grade: {
            student_id: studentId,
            grade: form[studentId].grade.value,
            description: this.state.gradesDescription,
            lesson_id: String(this.props.lessonId) }
        }
        grades.push(grade)
      }
    })
    return grades
  }
  handleSubmit() {
    let grades = this.extractGrades(this.props.grades)
    this.props.sendMultiGrade(grades, this.handleDisplay)
  }
  handleDisplay() {
    this.props.handleStudentDisplay('none')
  }
  componentDidMount() {
    this.setState({gradesDescription: ""})
  }
  render() {
    const { fields: { grade }, handleSubmit, lastItem } = this.props
    return (
      <div>
        <div className="input-group">
          <form style={{display: 'inline', margin: 0, padding: 0}}>
            <span className="input-group-addon" id="basic-addon1">Grade:</span>
            <input type="text" 
              autocomplete="off"
              className="form-control input-sm pull-right"
              style={{width: '5em', height: '2.3em', display: 'inline'}} {...grade}/>
          </form>
        </div>
        {lastItem ? this.renderActionButtons() : ""}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    grades: state.form.Grade
  }
}

Grade = reduxForm({
  form: 'Grade',
  fields,
  validate
}, mapStateToProps, actions)(Grade)

export default Grade
