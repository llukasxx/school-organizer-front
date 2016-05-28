import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/MessagesReducer'

import ConversationListItem from '../../components/Messages/ConversationListItem'

class ConversationsList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <ul className="list-group">
          <ConversationListItem />
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    conversations: state
  }
}

export default connect(mapStateToProps, actions)(ConversationsList)