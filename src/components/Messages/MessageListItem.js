import React, { Component } from 'react'

class MessageListItem extends Component {
  constructor(props) {
    super(props)
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
      </li>
    )
  }
}

export default MessageListItem