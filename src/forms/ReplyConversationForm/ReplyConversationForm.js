import React from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../redux/modules/MessagesReducer'

export const fields = ['body']

const validate = (values) => {
  const errors = {}
  return errors
}

export class ReplyConversation extends React.Component {
  constructor(props) {
    super(props)
    this.handleDisable = this.handleDisable.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleDisable() {
    const { fields: { body } } = this.props
    if(body.value.length > 0) {
      return false
    } else {
      return true
    }
  }
  handleSubmit() {
    const { fields: { body }, conversationId } = this.props
    this.props.replyToConversation({id: conversationId, body: body.value})
    this.props.handleReplyForm()
  }
  render() {
    const { fields: { body } } = this.props
    return (
      <form>
        <textarea className="form-control" 
            rows="3" placeholder="Type your message..."
            {...body}>
        </textarea>
        <button className="btn btn-success" 
                style={{marginRight: '5px'}}
                disabled={this.handleDisable()}
                onClick={(e) => {
                  e.preventDefault()
                  this.handleSubmit()
                }}>Send</button>
        <button className="btn btn-danger" 
          onClick={(e) => {
            e.preventDefault()
            this.props.handleReplyForm()
          }}>Cancel</button>
      </form>
    )
  }
}

ReplyConversation = reduxForm({
  form: 'ReplyConversation',
  fields,
  validate
}, null, actions)(ReplyConversation)

export default ReplyConversation
