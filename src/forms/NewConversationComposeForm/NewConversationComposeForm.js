import React from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../redux/modules/ReceiversReducer'

import { studentsArraySelector } from '../../selectors/ReceiversSelector'

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
  componentDidMount() {
    this.props.getAllStudents()
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
        {this.props.loaded ?
          <div>
            <Receivers 
              students={this.props.students}
              studentsCount={this.props.studentsCount}/>
            <ReceiversBox />
          </div>
          :
          "Loading..."
        }
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: studentsArraySelector(state),
    loaded: state.receivers.loaded,
    studentsCount: state.receivers.studentsCount
  }
}

NewConversationCompose = reduxForm({
  form: 'NewConversationCompose',
  fields,
  validate
}, mapStateToProps, actions)(NewConversationCompose)

export default NewConversationCompose
