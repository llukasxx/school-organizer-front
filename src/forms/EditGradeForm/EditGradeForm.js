import React from 'react'
import { reduxForm, reset, changeWithKey } from 'redux-form'

export const fields = ['grade', 'description']

const validate = (values) => {
  const errors = {}
  return errors
}

export class EditGrade extends React.Component {
  constructor(props) {
    super(props)
    this.renderButtons = this.renderButtons.bind(this)
  }
  renderButtons() {
    const grade = this.props.grade
    if(grade) {
      return (
        "sth will be here"
      )
    } else {
      return "No grades found."
    }
  }
  render() {
    const { fields: {grade, description}, 
            handleSubmit, 
            initialDescription, 
            initialGrade, 
            formKey,
            lastItem,
            resetParent,
            dispatch } = this.props
    return (
      <form style={{margin: 0, padding: 0}}>
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1">Description:</span>
          <input type="text" 
            placeholder="eg. test"
            className="form-control input-sm"
            style={{width: '10em', height: '2.5em'}} {...description}/>
        </div>
        <div className="input-group" style={{marginBottom: '10px'}}>
          <span style={{width: '7.1em'}}className="input-group-addon" id="basic-addon1">Grade:</span>
          <input type="text" 
            placeholder="eg. 5"
            className="form-control input-sm"
            style={{width: '10em', height: '2.5em'}} {...grade}/>
        </div>
        <button className="btn btn-success">Update</button> | <button className="btn btn-warning"
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
})(EditGrade)

export default EditGrade
