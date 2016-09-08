import React from 'react'

export class EventsListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <li className="list-group-item">
        <b>Name:</b> {this.props.event.name}
        <br />
        <b>Date:</b> {this.props.event.date}
        <br />
        <b>Created by:</b> {this.props.event.creator.name}
        <br />
        <b>Groups:</b> TBD
      </li>
    )
  }
}

export default EventsListItem