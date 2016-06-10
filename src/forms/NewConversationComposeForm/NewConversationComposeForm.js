import React from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../redux/modules/ReceiversReducer'
import Receivers from './Receivers'
import ReceiversBox from './ReceiversBox' 
import ReceiverSearchForm from './ReceiverSearchForm'

export const fields = ['subject', 'body', 'query']

const validate = (values) => {
  const errors = {}
  return errors
}


export class NewConversationCompose extends React.Component {
  constructor(props) {
    super(props)
    this.handleQueryChange = this.handleQueryChange.bind(this)
  }
  handleQueryChange(query) {
    const { activeTab, 
            getPaginatedStudents,
            getPaginatedTeachers,
            getPaginatedGroups,
            getPaginatedLessons } = this.props
    switch(activeTab) {
      case 'students':
        getPaginatedStudents(1, query)
        break;
      case 'teachers':
        getPaginatedTeachers(1, query)
        break;
      case 'groups':
        getPaginatedGroups(1, query)
        break;
      case 'lessons':
        getPaginatedLessons(1, query)
        break;
    }
  }
  render() {
    const { fields: {subject, body, query}, handleSubmit, activeTab } = this.props
    return (
      <form>
        <div className="form-group">
            <label><h4>Subject</h4></label>
            <input className="form-control" placeholder="subject..." {...subject}/>
        </div>
        <div className="form-group">
          <label><h4>Message</h4></label>
          <textarea className="form-control" placeholder="Type message..." {...body}>
          </textarea>
        </div>
        <ReceiverSearchForm activeTab={activeTab}
                            query={query}
                            handleChange={this.handleQueryChange}/>
        <br />
        <div className="row">
          <Receivers />
        </div>
        <ReceiversBox />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeTab: state.receivers.activeTab
  }
}

NewConversationCompose = reduxForm({
  form: 'NewConversationCompose',
  fields,
  validate
}, mapStateToProps, actions)(NewConversationCompose)

export default NewConversationCompose
