import React, { Component } from 'react'

class ReceiversBox extends Component {
  constructor(props) {
    super(props)
    this.renderReceivers = this.renderReceivers.bind(this)
  }
  renderReceivers() {
    return (
      <div className="list-group">
        
      </div>
    )
  }
  render() {
    return (
      <div>
        <h3>Receivers:</h3>
        {this.renderReceivers()}
        <button className="btn btn-lg btn-success">
          Send Message <span className="glyphicon glyphicon-send"/>
        </button>
      </div>
    )
  }
}

export default ReceiversBox