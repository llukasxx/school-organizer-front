import React from 'react'

type Props = {

};
export class TeacherGroupInfo extends React.Component {
  props: Props;

  render () {
    return (
      <div className="col-md-5 col-sm-6">
        <div className="panel panel-info">
          <div className="panel-heading">Group Info</div>
          <div className="panel-body">
            <p>Information:</p>
          </div>
          <table className="table">
            <thead>
              <tr><th>Group name: </th></tr>
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
        </div>
      </div>
    )
  }
}

export default TeacherGroupInfo

