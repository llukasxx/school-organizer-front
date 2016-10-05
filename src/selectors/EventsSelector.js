import { createSelector } from 'reselect'

const getPaginatedEvents = (state) => {
  let eventsArray = []
  let events = state.paginatedEntities.events
  Object.keys(events).map((event) => {
    eventsArray.push(events[event])
  })
  return eventsArray
}

export const allEventsArraySelector = createSelector(
  [getPaginatedEvents],
  events => events
)