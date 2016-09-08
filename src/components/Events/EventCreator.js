import React from 'react'

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
            <p></p>
          </div>
          <table className="table">
            ...
          </table>
        </div>
      </div>
    )
  }
}

export default EventCreator