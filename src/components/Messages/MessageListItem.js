import React, { Component } from 'react'
import ReplyConversation from '../../forms/ReplyConversationForm'

class MessageListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {showReplyForm: false}
    this.renderReplyForm = this.renderReplyForm.bind(this)
    this.renderReplyButton = this.renderReplyButton.bind(this)
    this.handleReplyForm = this.handleReplyForm.bind(this)
  }
  renderReplyForm() {
    return (
      <ReplyConversation 
        key={this.props.message.id}
        formKey={String(this.props.message.id)}
        handleReplyForm={this.handleReplyForm}
        conversationId={this.props.message.conversationId}/>
    )
  }
  renderReplyButton() {
    return (
      <i onClick={this.handleReplyForm}>
        <a style={{cursor: 'pointer'}}>
          Quick reply <span className="glyphicon glyphicon-share-alt"/>
        </a>
      </i>
    )
  }
  handleReplyForm() {
    const toggle = !this.state.showReplyForm
    this.setState({showReplyForm: toggle})
  }
  render() {
    const { message } = this.props
    return (
      <li href="#" className="list-group-item">
        <div style={{paddingBottom: '10px'}}>
          <h4 
          className="list-group-item-heading"
          style={{display: 'inline'}}>
            <strong>{message.subject}</strong>
          </h4>
        </div>
        <p className="list-group-item-text">
          {message.body}
        </p>
        <hr style={{margin: '5px 5px'}}/>
        <i>Sent by: <b>{message.sender.firstName + ' ' + message.sender.lastName}</b></i>
        <i className="pull-right">Sent at: <b>{message.createdAt}</b></i>
        <br />
        {this.state.showReplyForm ? this.renderReplyForm() : this.renderReplyButton()}
      </li>
    )
  }
}

export default MessageListItem