import React from 'react'
import { reduxForm } from 'redux-form'

export const fields = ['grade', 'description']

const validate = (values) => {
  const errors = {}
  return errors
}

export class Grade extends React.Component {
  //HANDLE SUBMIT TDB!!!
  render() {
    const { fields: { grade }, handleSubmit } = this.props
    return (
      <div className="input-group">
        <form style={{display: 'inline', margin: 0, padding: 0}}>
          <span className="input-group-addon" id="basic-addon1">Grade:</span>
          <input type="text" 
            autocomplete="off"
            className="form-control input-sm pull-right"
            style={{width: '5em', height: '2.3em', display: 'inline'}} {...grade}/>
        </form>
      </div>
    )
  }
}

Grade = reduxForm({
  form: 'Grade',
  fields,
  validate
})(Grade)

export default Grade
