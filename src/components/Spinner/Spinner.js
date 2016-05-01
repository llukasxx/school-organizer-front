import React, { Component } from 'react'

class MySpinner extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let target = document.getElementById('spinner')
    let spinner = new Spinner(this.props.opts).spin(target)
  }
  render() {
    return (
      <span id="spinner"/>
    )
  }
}

export default MySpinner