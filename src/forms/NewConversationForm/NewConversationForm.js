import React from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../redux/modules/MessagesReducer'

export const fields = ['subject', 'body']

const validate = (values) => {
  const errors = {}
  return errors
}


export class NewConversation extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDisable = this.handleDisable.bind(this)
  }
  handleSubmit() {
    const { fields: { subject, body } } = this.props
    this.props.startNewConversation({
      user_id: this.props.studentId, 
      subject: subject.value,
      body: body.value
    })
  }
  handleDisable() {
    const { fields: { subject, body } } = this.props
    if(subject.value.length > 0 && body.value.length > 0) {
      return false
    } else {
      return true
    }
  }
  render() {
    const { fields: { subject, body } } = this.props
    return (
      <form>
        <hr />
        <label>Subject:</label>
        <input type="text" className="form-control" 
               aria-describedby="basic-addon1" 
               {...subject}/>
        <label>Message:</label>
        <textarea className="form-control" 
            rows="3"
            {...body}>
        </textarea>
        <br />
        <button className="btn btn-success" 
                style={{marginRight: '5px'}}
                disabled={this.handleDisable()}
                onClick={(e) => {
                  e.preventDefault()
                  this.handleSubmit()
                  this.props.resetParent()
                }}>Send <span className="glyphicon glyphicon-send"/></button>
        <button className="btn btn-danger pull-right" 
                onClick={(e) => {
                  e.preventDefault()
                  this.props.resetParent()
                }}>Cancel <span className="glyphicon glyphicon-off"/></button>
      </form>
    )
  }
}

NewConversation = reduxForm({
  form: 'NewConversation',
  fields,
  validate
}, null, actions)(NewConversation)

export default NewConversation
