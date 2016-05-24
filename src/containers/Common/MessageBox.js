import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/MessagesReducer'


export class MessageBox extends React.Component {
  constructor(props) {
    super(props)
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
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

export default connect(
  mapStateToProps,
  actions
)(MessageBox)
