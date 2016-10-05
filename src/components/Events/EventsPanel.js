import React from 'react'

import EventsList from './EventsList'
import EventFilter from './EventFilter'

export class EventsPanel extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    const { eventsType } = this.props
    return (
      <div className="col-md-6">
        <div className={`panel panel-${eventsType == 'upcoming' ? 'info' : 'default'}`}>
          <div className="panel-heading">
            <b>{`${eventsType == 'upcoming' ? 'Upcoming Events' : 'Past Events'}`}</b>
            <a className="pull-right" 
               style={{cursor: 'pointer'}}
               onClick={(e) => {
                 e.preventDefault()
                 eventsType == 'upcoming' ? this.props.changeEventsType('past') : this.props.changeEventsType('upcoming')
               }}>
               {`Show ${eventsType == 'upcoming' ? 'past' : 'upcoming'} events`}</a>
          </div>
          <EventFilter 
            activeFilter = { this.props.activeFilter }
            changeActiveFilter = { this.props.changeActiveFilter }/>
          <EventsList 
            events = { this.props.events }
            getEvents = { this.props.getEvents }
            count = { this.props.count } 
            activeFilter = { this.props.activeFilter }/>
        </div>
      </div>
    )
  }
}

export default EventsPanel