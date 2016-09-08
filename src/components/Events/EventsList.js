import React from 'react'

import EventListItem from './EventListItem'

export class EventsList extends React.Component {
  constructor(props) {
    super(props)
    this.renderEventListItems = this.renderEventListItems.bind(this)
  }
  renderEventListItems() {
    let eventsList = []
    this.props.events.map((event) => {
      eventsList.push(<EventListItem 
                        event={event}
                        key={event.id}/>)
    })
    return eventsList
  }
  render () {
    return (
      <ul className="list-group">
        {this.renderEventListItems()}
      </ul>
    )
  }
}

export default EventsList