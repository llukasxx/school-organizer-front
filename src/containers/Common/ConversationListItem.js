import React, { Component } from 'react'
import { connect } from 'react-redux'
import { conversationMessagesArraySelector } from '../../selectors/MessagesSelector'

class ConversationListItem extends Component {
  constructor(props) {
    super(props)
    this.extractSender = this.extractSender.bind(this)
    this.extractLastMessageTime = this.extractLastMessageTime.bind(this)
  }
  extractSender() {
    const { messages } = this.props
    if(messages[0]) {
      return `${messages[0].sender.firstName} ${messages[0].sender.lastName}`
    } else {
      return ""
    }
  }
  extractLastMessageTime() {
    const { messages } = this.props
    const length = messages.length - 1
    if(messages[length]) {
      return messages[length].createdAt
    } else {
      return ""
    }
  }
  render() {
    const { conversation } = this.props
    return (
      <li className="list-group-item" style={{cursor: 'pointer'}}>
        <div className="row">
          <div className="col-md-3" style={{display: 'inline'}}>
            From: <strong>{this.extractSender()}</strong>
          </div> 
          <div className="col-md-offset-2 col-sm-offset-2" style={{display: 'inline'}}>
            Subject: <strong>{conversation.subject}</strong>
          </div>
          <div style={{display: 'inline'}} className="pull-right">
            <i>{this.extractLastMessageTime()}</i>
          </div>
        </div>
      </li>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    messages: conversationMessagesArraySelector(state, props)
  }
}

export default connect(mapStateToProps, null)(ConversationListItem)