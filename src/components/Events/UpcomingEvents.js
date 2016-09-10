import React from 'react'

import EventsList from './EventsList'
import EventFilter from './EventFilter'

export class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className="col-md-4">
        <div className="panel panel-primary">
          <div className="panel-heading"><b>Upcoming Events</b></div>
          <EventFilter />
          <EventsList 
            events = { this.props.events }
            getEvents = { this.props.getEvents }/>
        </div>
      </div>
    )
  }
}

export default UpcomingEvents