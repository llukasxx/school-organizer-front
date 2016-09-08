import React from 'react'

export class PastEvents extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className="col-md-4">
          <div className="panel panel-warning">
            <div className="panel-heading"><b>Past Events</b></div>
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

export default PastEvents