import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../redux/modules/EventsReducer'

import { allEventsArraySelector } from '../../selectors/EventsSelector'

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
  render () {
    return (
      <div>
        <UpcomingEvents 
          events={ this.props.events }
          getEvents= { this.props.fetchUpcomingEvents }
          count = { this.props.upcomingEventsCount }/>
        <EventCreator />
        <PastEvents />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    events: allEventsArraySelector(state, ownProps),
    upcomingEventsCount: state.events.upcomingEventsCount
  }
}
export default connect(mapStateToProps, actions)(TeacherEvents)

