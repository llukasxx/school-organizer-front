import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/MessagesReducer'
import { inboxMessagesArraySelector } from '../../selectors/MessagesSelector'

import MessageListItem from '../../components/Messages/MessageListItem'


export class MessageBox extends React.Component {
  constructor(props) {
    super(props)
    this.renderMessages = this.renderMessages.bind(this)
  }
  renderMessages() {
    const { messages } = this.props
    let messageArray = []
    if(messages.length > 0) {
      messages.map((m) => {
        messageArray.push(<MessageListItem 
                            key={m.id}
                            message={m}
                          />)
      })
      return messageArray
    } else {
      return <p>No messages</p>
    }
  }
  componentDidMount() {
    this.props.getInbox()
  }
  render() {
    return (
      <div className="col-md-5 col-sm-6 ">
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">Recent Messages</h3>
          </div>
          <div className="panel-body">
            <div className="list-group">
              {this.renderMessages()}            
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: inboxMessagesArraySelector(state)
  }
}

export default connect(
  mapStateToProps,
  actions
)(MessageBox)
