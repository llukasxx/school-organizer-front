import React, { Component } from 'react'
import { connect } from 'react-redux'
import { conversationMessagesArraySelector,
         firstMessageReceiverSelector } from '../../selectors/MessagesSelector'

import ReplyConversation from '../../forms/ReplyConversationForm'
import ConversationMessageListItem from '../../components/Messages/ConversationMessageListItem'


class ConversationListItem extends Component {
  constructor(props) {
    super(props)
    this.extractSender = this.extractSender.bind(this)
    this.extractLastMessageTime = this.extractLastMessageTime.bind(this)
    this.handleMessagesDisplay = this.handleMessagesDisplay.bind(this)
    this.renderReplyForm = this.renderReplyForm.bind(this)
    this.handleFormDisplay = this.handleFormDisplay.bind(this)
    this.state = {showMessages: false, showReplyForm: false}
  }
  extractSender() {
    const { messages } = this.props
    if(messages[0]) {
      return `${messages[0].sender.firstName} ${messages[0].sender.lastName}`
    } else {
      return ""
    }
  }
  extractFirstReceiver() {
    const { receiver } = this.props
    return `${receiver.firstName} ${receiver.lastName}`
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
  renderMessagesListItems() {
    const { messages } = this.props
    let messagesList = []
    if(messages) {
      messages.map((el) => {
        messagesList.push(
          <ConversationMessageListItem 
            key={el.id}
            message={el}/>)
      })
    } else {
      return 'No messages'
    }
    return messagesList
  }
  renderReplyForm() {
    const { conversation } = this.props
    return (
      <div>
        <br />
        {this.state.showReplyForm ? 
          <ReplyConversation 
              key={conversation.id}
              formKey={String(conversation.id)}
              handleReplyForm={this.handleFormDisplay}
              conversationId={conversation.id}/>
          :
          <a style={{cursor: 'pointer'}} onClick={this.handleFormDisplay}>
            Reply<span className="glyphicon glyphicon-share-alt"/>
          </a>
        }
      </div>
    )
  }
  handleMessagesDisplay() {
    let toggled = !this.state.showMessages
    this.setState({showMessages: toggled})
  }
  handleFormDisplay() {
    let toggled = !this.state.showReplyForm
    this.setState({showReplyForm: toggled})
  }
  render() {
    const { conversation } = this.props
    return (
      <li className="list-group-item">
        <div className="row"
          style={{cursor: 'pointer'}} 
          onClick={(e) => {
            this.handleMessagesDisplay()
          }}>
          <div className="col-md-4" style={{display: 'inline'}}>
            {this.props.sentbox ? 
              `To: ${this.extractFirstReceiver()}`
            : 
              `Started by: ${this.extractSender()}`
            }
          </div> 
          <div className="col-md-offset-1 col-sm-offset-2" style={{display: 'inline'}}>
            Subject: <strong>{conversation.subject}</strong>
          </div>
          <div style={{display: 'inline', marginRight: '2px'}} className="pull-right">
            <i>{this.extractLastMessageTime()}</i>
          </div>
        </div>
        <div className={this.state.showMessages ? "" : "hidden"}>
          <hr />
          <ul className="list-group">
            {this.renderMessagesListItems()}
            {this.renderReplyForm()}
          </ul>
        </div>
      </li>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    messages: conversationMessagesArraySelector(state, props),
    receiver: firstMessageReceiverSelector(state, props)
  }
}

export default connect(mapStateToProps, null)(ConversationListItem)