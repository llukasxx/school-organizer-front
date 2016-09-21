import React from 'react'

export class SimpleGroupListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    const { pickGroup, group } = this.props
    return (
      <button style={{'marginRight': '3px', 'marginBottom': '3px'}} 
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                pickGroup(group.id)
              }}>
        {group.name}
        <span className="glyphicon glyphicon-plus"/>
      </button>
    )
  }
}

export default SimpleGroupListItem