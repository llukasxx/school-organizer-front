import React from 'react'

export class SimpleGroupListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <button style={{'marginRight': '3px', 'marginBottom': '3px'}} className="btn btn-primary">
        {this.props.group.name}
        <span className="glyphicon glyphicon-plus"/>
      </button>
    )
  }
}

export default SimpleGroupListItem