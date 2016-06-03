import React, { Component } from 'react'
import NewConversationCompose from '../../forms/NewConversationComposeForm'

class ComposeMessage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <NewConversationCompose />
      </div>
    )
  }
}

export default ComposeMessage