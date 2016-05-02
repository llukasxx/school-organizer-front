import React from 'react'

import MySpinner from '../Spinner/Spinner'
import { smallSpinnerRight } from '../../utils/SpinnerConfig'


export class TeacherGroupInfo extends React.Component {
  render () {
    return (
      <div className="col-md-5 col-sm-6">
        <div className="panel panel-info">
          <div className="panel-heading">
            Group Info
            <div className="pull-right">
              {this.props.loaded ? "" : <MySpinner opts={smallSpinnerRight}/>}
            </div>
          </div>
          <div className="panel-body">
          {this.props.loaded ?
            <table className="table">
              <thead>
                <tr><th>Group name: {this.props.activeGroup.name}</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button  
                        className="btn btn-warning"
                        id="lessonDates">Dates:
                    </button>
                   <button 
                           className="btn btn-success"
                           id="studentList">Students:
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            : "loading..."}
          </div>
        </div>
      </div>
    )
  }
}

export default TeacherGroupInfo

