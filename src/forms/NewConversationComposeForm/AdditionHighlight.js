import React, { Component } from 'react'

class AdditionHighlight extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{
                position: 'relative',
                bottom: '3.5em',
                visibility: this.props.active ? "" : "hidden"
              }}>
        <span className="glyphicon glyphicon-plus pull-right"/>
      </div>
    )
  }
}

export default AdditionHighlight