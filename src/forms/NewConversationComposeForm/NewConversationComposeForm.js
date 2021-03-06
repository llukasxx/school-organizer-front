import React from 'react'
import { reduxForm } from 'redux-form'
import * as receiversActions from '../../redux/modules/ReceiversReducer'
import * as messagesActions from '../../redux/modules/MessagesReducer'

import { activeReceiversArraySelector } from '../../selectors/ReceiversSelector'

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
    this.handleDisable = this.handleDisable.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.extractReceivers = this.extractReceivers.bind(this)
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
  handleDisable() {
    const { fields: {subject, body}, activeReceivers} = this.props
    if(subject.value.length > 0 && body.value.length > 0 && activeReceivers.length > 0) {
      return false
    } else {
      return true
    }
  }
  handleSubmit() {
    const { fields: {subject, body}, activeReceivers} = this.props
    let receivers = this.extractReceivers()
    let conversation = {
      subject: subject.value,
      body: body.value,
      receivers
    }
    this.props.startNewBroadcastConversation(conversation)
  }
  extractReceivers() {
    const { activeReceivers } = this.props
    let obj = {
      users: [],
      groups: [],
      lessons: []
    }
    activeReceivers.map((el) => {
      switch(el.type) {
        case 'student':
          obj.users.push(el.id)
          break;
        case 'teacher':
          obj.users.push(el.id)
          break;
        case 'group':
          obj.groups.push(el.id)
          break;
        case 'lesson':
          obj.lessons.push(el.id)
          break;
      }
    })
    return obj
  }
  render() {
    const { fields: {subject, body, query}, activeTab } = this.props
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
        <div className="row">
          <ReceiversBox 
            activeReceivers={this.props.activeReceivers}
            removeReceiver={this.props.removeReceiver}/>
        </div>
        <hr />
        <button className="btn btn-lg btn-success"
                disabled={this.handleDisable()}
                onClick={(e) => {
                  e.preventDefault()
                  this.handleSubmit()
                }}>
          Send Message <span className="glyphicon glyphicon-send"/>
        </button>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeTab: state.receivers.activeTab,
    activeReceivers: activeReceiversArraySelector(state)
  }
}

const mapDispatchToProps = 

NewConversationCompose = reduxForm({
  form: 'NewConversationCompose',
  fields,
  validate
}, mapStateToProps, Object.assign({}, receiversActions, messagesActions))(NewConversationCompose)

export default NewConversationCompose
