import React from 'react'
import { reduxForm } from 'redux-form'

export const fields = ['grade', 'description']

const validate = (values) => {
  const errors = {}
  return errors
}

export class IndvGrade extends React.Component {

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
          <button className="btn btn-success">Confirm</button> | <button 
                                                                          className="btn btn-danger"
                                                                          onClick={(e) => {
                                                                            e.preventDefault()
                                                                            this.props.resetState()
                                                                          }}>
                                                                          Cancel</button>
        </form>
    )
  }
}

IndvGrade = reduxForm({
  form: 'IndvGrade',
  fields,
  validate
})(IndvGrade)

export default IndvGrade
