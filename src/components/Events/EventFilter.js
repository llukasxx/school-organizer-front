import React from 'react'

export class EventFilter extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render () {
    return (
      <div className="panel-body">
        <ul className="breadcrumb">
          <li className="active"><a>All</a></li>
          <li><a>Connected to me</a></li>
          <li><a>Created by me</a></li>
        </ul>
      </div>
    )
  }
}

export default EventFilter