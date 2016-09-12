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
          console.log('connected called')
          break;
        case 'created':
          console.log('created called')
          break;
        default:
          this.props.fetchUpcomingEvents()
          break;
      }
    }
  }
  render () {
    return (
      <div>
        <UpcomingEvents 
          events={ this.props.upcomingEvents }
          getEvents= { this.props.fetchUpcomingEvents }
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

