import React from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../redux/modules/GroupsReducer'

export const fields = ['grade', 'description']

const validate = (values) => {
  const errors = {}
  return errors
}

export class IndvGrade extends React.Component {
  constructor(props) {
    super(props)
    this.handleDisable = this.handleDisable.bind(this)
  }
  handleDisable() {
    const { fields: { grade, description } } = this.props
    if(grade.value.length > 0 && description.value.length > 0) {
      return false
    } else {
      return true
    }
  }
  render() {
    const { fields: { grade, description }, handleSubmit } = this.props

    return (
      <form style={{margin: 0, padding: 0}}>
        <hr />
        <h4>New grade</h4>
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1">Description:</span>
          <input type="text" 
            placeholder="eg. test"
            className="form-control input-sm"
            style={{width: '10em', height: '2.5em'}}
            {...description}/>
        </div>
        <div className="input-group">
          <span style={{width: '7.1em'}}className="input-group-addon" id="basic-addon1">Grade:</span>
          <input type="text" 
            placeholder="eg. 5"
            className="form-control input-sm"
            style={{width: '10em', height: '2.5em'}}
            {...grade}/>
        </div>
          <br />
          <button 
            className="btn btn-success" 
            style={{marginRight: '10px'}}
            disabled={this.handleDisable()}
            onClick={(e) => {
              e.preventDefault()
              let grade = {
                grade: this.props.fields.grade.value, 
                description: this.props.fields.description.value,
                student_id: this.props.studentId,
                lesson_id: this.props.lessonId
              }
              this.props.sendGrade(grade)
            }}>
            Confirm
          </button> 
          <button 
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault()
              this.props.resetState()
            }}>Cancel</button>
        </form>
    )
  }
}

IndvGrade = reduxForm({
  form: 'IndvGrade',
  fields,
  validate
}, null, actions)(IndvGrade)

export default IndvGrade
