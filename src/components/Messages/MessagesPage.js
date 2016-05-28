import React from 'react'

import ConversationsList from '../../containers/Common/ConversationsList'
import SentboxList from '../../containers/Common/SentboxList'
import ComposeMessage from '../../containers/Common/ComposeMessage'

export class MessagesPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {conversations: true, sentbox: false, newMessage: false}
    this.setActive = this.setActive.bind(this)
  }
  setActive(newActiveTab = 'conversations') {
    const defaultState = {conversations: false, sentbox: false, newMessage: false}
    switch(newActiveTab) {
      case 'conversations':
        this.setState({...defaultState, conversations: true})
        break;
      case 'sentbox':
        this.setState({...defaultState, sentbox: true})
        break;
      case 'newMessage':
        this.setState({...defaultState, newMessage: true})
        break;
    }
  }
  render() {
    let toRender = <ConversationsList />
    if(this.state.conversations) {
      toRender = <ConversationsList />
    } else if(this.state.sentbox) {
      toRender = <SentboxList />
    } else if(this.state.newMessage) {
      toRender = <ComposeMessage />
    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <ul className="nav nav-tabs">
          <li 
            role="presentation"
            className={this.state.conversations ? "active" : ""}>
            <a 
              style={cursorStyle}
              onClick={(e) => {
                e.preventDefault()
                this.setActive('conversations')
              }}>
              Conversations
            </a>
          </li>
          <li 
            role="presentation"
            className={this.state.sentbox ? "active" : ""}>
            <a 
              style={cursorStyle}
              onClick={(e) => {
                e.preventDefault()
                this.setActive('sentbox')
              }}>
              Sentbox
            </a>
          </li>
          <li 
            role="presentation"
            className={this.state.newMessage ? "active" : ""}>
            <a 
              style={cursorStyle}
              onClick={(e) => {
                e.preventDefault()
                this.setActive('newMessage')
              }}>
              Compose new message
            </a>
          </li>
        </ul>
        {toRender}
      </div>
    )
  }
}


export default MessagesPage

const cursorStyle = {
  cursor: 'pointer'
}