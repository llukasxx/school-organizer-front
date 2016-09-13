import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../redux/modules/EventsReducer'

import { allUpcomingEventsArraySelector } from '../../selectors/EventsSelector'

import UpcomingEvents from '../../components/Events/UpcomingEvents'
import PastEvents from '../../components/Events/PastEvents'
import EventCreator from '../../components/Events/EventCreator'

export class TeacherEvents extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchUpcomingEvents()
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.activeFilter != nextProps.activeFilter) {
      switch(nextProps.activeFilter) {
        case 'all':
          this.props.fetchUpcomingEvents()
          break;
        case 'connected':
          this.props.fetchUpcomingConnectedEvents()
          break;
        case 'created':
          this.props.fetchUpcomingCreatedEvents()
          break;
        default:
          this.props.fetchUpcomingEvents()
          break;
      }
    }
  }
  render () {
    let currentGetEvent = this.props.fetchUpcomingEvents
    switch(this.props.activeFilter) {
      case 'all':
        currentGetEvent = this.props.fetchUpcomingEvents
        break;
      case 'connected':
        currentGetEvent = this.props.fetchUpcomingConnectedEvents
        break;
      case 'created':
        currentGetEvent = this.props.fetchUpcomingCreatedEvents
        break;
      default:
        currentGetEvent = this.props.fetchUpcomingEvents
        break;
    }
    return (
      <div>
        <UpcomingEvents 
          events={ this.props.upcomingEvents }
          getEvents= { currentGetEvent }
          count = { this.props.upcomingEventsCount }
          activeFilter = { this.props.activeFilter }
          changeActiveFilter = { this.props.changeActiveFilter }/>
        <EventCreator />
        <PastEvents />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    upcomingEvents: allUpcomingEventsArraySelector(state, ownProps),
    upcomingEventsCount: state.events.upcomingEventsCount,
    activeFilter: state.events.activeFilter
  }
}
export default connect(mapStateToProps, actions)(TeacherEvents)

