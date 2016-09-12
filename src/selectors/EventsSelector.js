import { createSelector } from 'reselect'

const getPaginatedUpcomingEvents = (state) => {
  let eventsArray = []
  let events = state.paginatedEntities.events
  Object.keys(events).map((event) => {
    eventsArray.push(events[event])
  })
  return eventsArray
}

export const allUpcomingEventsArraySelector = createSelector(
  [getPaginatedUpcomingEvents],
  events => events
)