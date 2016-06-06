import React from 'react'
import { reduxForm } from 'redux-form'

import Receivers from './Receivers'
import ReceiversBox from './ReceiversBox' 


export const fields = ['subject', 'body']

const validate = (values) => {
  const errors = {}
  return errors
}


export class NewConversationCompose extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { fields: {subject, body}, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label><h4>Subject</h4></label>
            <input className="form-control" placeholder="subject..." {...subject}/>
        </div>
        <div className="form-group">
          <label><h4>Message</h4></label>
          <textarea className="form-control" placeholder="Type message..." {...body}>
          </textarea>
        </div>
        <div>
          <Receivers />
          <ReceiversBox />
        </div>
      </form>
    )
  }
}


NewConversationCompose = reduxForm({
  form: 'NewConversationCompose',
  fields,
  validate
}, null)(NewConversationCompose)

export default NewConversationCompose
