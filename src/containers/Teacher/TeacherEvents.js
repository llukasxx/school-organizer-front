import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../redux/modules/EventsReducer'

import { allEventsArraySelector } from '../../selectors/EventsSelector'

import EventsPanel from '../../components/Events/EventsPanel'
import EventCreator from '../../components/Events/EventCreator'

export class TeacherEvents extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { eventsType, fetchUpcomingEvents, fetchPastEvents } = this.props
    eventsType == 'upcoming' ? fetchUpcomingEvents() : fetchPastEvents()
  }
  componentWillReceiveProps(nextProps) {
    const { eventsType, eventsActiveFilter, 
            fetchUpcomingEvents, fetchUpcomingConnectedEvents,
            fetchUpcomingCreatedEvents, fetchPastEvents,
            fetchPastConnectedEvents, fetchPastCreatedEvents } = this.props
    const upcoming = nextProps.eventsType == 'upcoming' ? true : false
    if(eventsActiveFilter != nextProps.eventsActiveFilter || eventsType != nextProps.eventsType) {
      switch(nextProps.eventsActiveFilter) {
        case 'all':
          upcoming ? fetchUpcomingEvents() : fetchPastEvents()
          console.log(upcoming)
          break;
        case 'connected':
          upcoming ? fetchUpcomingConnectedEvents() : fetchPastConnectedEvents()
          break;
        case 'created':
          upcoming ? fetchUpcomingCreatedEvents() : fetchPastCreatedEvents()
          break;
        default:
          upcoming ? fetchUpcomingEvents() : fetchPastEvents()
          break;
      }
    }
  }
  render () {
    const { eventsType, eventsActiveFilter, 
            fetchUpcomingEvents, fetchUpcomingConnectedEvents,
            fetchUpcomingCreatedEvents, fetchPastEvents,
            fetchPastConnectedEvents, fetchPastCreatedEvents } = this.props
    let currentGetEvents = this.props.fetchUpcomingEvents
    const upcoming = eventsType == 'upcoming' ? true : false
    switch(eventsActiveFilter) {
      case 'all':
        currentGetEvents = upcoming ? fetchUpcomingEvents : fetchPastEvents
        break;
      case 'connected':
        currentGetEvents = upcoming ? fetchUpcomingConnectedEvents : fetchPastConnectedEvents
        break;
      case 'created':
        currentGetEvents = upcoming ? fetchUpcomingCreatedEvents : fetchPastCreatedEvents
        break;
      default:
        currentGetEvents = upcoming ? fetchUpcomingEvents : fetchPastEvents
        break;
    }
    return (
      <div>
        <EventsPanel 
          events={ this.props.events }
          getEvents= { currentGetEvents }
          count = { this.props.eventsCount }
          activeFilter = { this.props.eventsActiveFilter }
          changeActiveFilter = { this.props.changeActiveFilter }
          changeEventsType = { this.props.changeEventsType }
          eventsType = { this.props.eventsType }/>
        <EventCreator />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    events: allEventsArraySelector(state, ownProps),
    eventsCount: state.events.eventsCount,
    eventsActiveFilter: state.events.eventsActiveFilter,
    eventsType: state.events.eventsType
  }
}
export default connect(mapStateToProps, actions)(TeacherEvents)

