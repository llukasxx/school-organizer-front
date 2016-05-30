import React, { Component } from 'react'

class ConversationMessageListItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { message } = this.props
    return (
      <li className="list-group-item">
        <p>{message.body}</p>
        <i><small>{message.sender.firstName + ' ' + message.sender.lastName}</small></i>
        <i className="pull-right"><small>{message.createdAt}</small></i>
      </li>
    )
  }
}

export default ConversationMessageListItem