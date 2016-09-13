import React from 'react'

export class EventsListItem extends React.Component {
  constructor(props) {
    super(props)
    this.renderGroups = this.renderGroups.bind(this)
  }
  renderGroups() {
    let listing = ""
    const { groups } = this.props.event
    if(groups.length > 0) {
      groups.map((el) => {
        el == groups[groups.length-1] ? listing += el.name : listing += `${el.name}, `
      })
      return listing
    } else {
      return "No groups invited"
    }
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
        <b>Groups:</b> {this.renderGroups()}
      </li>
    )
  }
}

export default EventsListItem