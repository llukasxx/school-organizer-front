import React from 'react'
import NewEventCreator from '../../forms/EventCreatorForm'

export class EventCreator extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className="col-md-4">
        <div className="panel panel-success">
          <div className="panel-heading"><b>Event Creator</b></div>
          <div className="panel-body">
            <NewEventCreator />
          </div>
        </div>
      </div>
    )
  }
}

export default EventCreator