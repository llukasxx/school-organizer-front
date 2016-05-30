import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/MessagesReducer'
import { inboxConversationsArraySelector } from '../../selectors/MessagesSelector'

import ConversationListItem from './ConversationListItem'

class ConversationsList extends Component {
  constructor(props) {
    super(props)
    this.renderConversationListItems = this.renderConversationListItems.bind(this)
  }
  componentDidMount() {
    this.props.getInbox()
  }
  renderConversationListItems() {
    let conversationListItems = []
    this.props.conversations.map((el) => {
      conversationListItems.push(<ConversationListItem 
                                  key={el.id}
                                  conversation={el}
                                  />)
    })
    return conversationListItems
  }
  render() {
    return (
      <div>
        <ul className="list-group">
          {this.renderConversationListItems()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    conversations: inboxConversationsArraySelector(state)
  }
}

export default connect(mapStateToProps, actions)(ConversationsList)