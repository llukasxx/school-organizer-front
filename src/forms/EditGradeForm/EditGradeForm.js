import React from 'react'
import { reduxForm, reset } from 'redux-form'
import * as actions from '../../redux/modules/GroupsReducer'

export const fields = ['grade', 'description']

const validate = (values) => {
  const errors = {}
  return errors
}

export class EditGrade extends React.Component {
  constructor(props) {
    super(props)
    this.handleButtonDisable = this.handleButtonDisable.bind(this)
  }
  handleButtonDisable() {
    const currentGrade = this.props.fields.grade.value
    const initialGrade = this.props.fields.grade.initialValue
    const currentDescription = this.props.fields.description.value
    const initialDescription = this.props.fields.description.initialValue
    if(currentGrade == initialGrade && currentDescription == initialDescription) {
      return true
    } else {
      return false
    }
  }
  render() {
    const { fields: {grade, description}, 
            handleSubmit,
            formKey,
            lastItem,
            firstItem,
            resetParent,
            dispatch } = this.props
    return (
      <form style={{margin: 0, padding: 0}}>
        {firstItem ? (<div><hr /><h4>Editing grades</h4></div>): ""}
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1">Description:</span>
          <input type="text" 
            placeholder="eg. test"
            autocomplete="off"
            className="form-control input-sm"
            style={{width: '10em', height: '2.5em'}} {...description}/>
        </div>
        <div className="input-group" style={{marginBottom: '10px'}}>
          <span style={{width: '7.1em'}}className="input-group-addon" id="basic-addon1">Grade:</span>
          <input type="text" 
            placeholder="eg. 5"
            autocomplete="off"
            className="form-control input-sm"
            style={{width: '10em', height: '2.5em'}} {...grade}/>
        </div>
        <button disabled={this.handleButtonDisable()} 
                style={{marginRight: '10px'}} 
                className="btn btn-success"
                onClick={(e) => {
                  e.preventDefault()
                  let updatedGrade = {
                    grade: this.props.fields.grade.value, 
                    description: this.props.fields.description.value,
                    student_id: this.props.studentId,
                    lesson_id: this.props.lessonId,
                  }
                  this.props.updateGrade(updatedGrade, this.props.grade.id)
                }}>
                Update
        </button> 
        <button className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(reset('EditGrade', formKey))
                }}>Undo</button>
        <hr />
        {lastItem ? <button 
                      className="btn btn-danger btn-lg"
                      onClick={(e) => {
                        e.preventDefault()
                        resetParent()
                      }}>Go back</button> : ""}
      </form>
    )
  }
}

EditGrade = reduxForm({
  form: 'EditGrade',
  fields,
  validate
}, null, actions)(EditGrade)

export default EditGrade
