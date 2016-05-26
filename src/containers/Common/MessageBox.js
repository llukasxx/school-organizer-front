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
            <div className="list-group">
              <li href="#" className="list-group-item">
                <div style={{paddingBottom: '10px'}}>
                  <h4 
                  className="list-group-item-heading"
                  style={{display: 'inline'}}>
                    <strong>Subject</strong>
                  </h4>
                  <span className="pull-right"><i>view</i></span>
                </div>
                <p className="list-group-item-text">
                  yoyoy how yo doing buddyy!!!
                </p>
                <hr style={{margin: '5px 5px'}}/>
                <i>Sent by:</i>
                <i className="pull-right">Sent at:</i>
              </li>
            </div>
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
