import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/GroupsReducer'



export class StudentClasses extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <div className="col-md-2 col-sm-4">
          <div className="panel panel-info">
            <div className="panel-heading">Classes will be</div>
            <div className="panel-body">
              <p>Lessons you are attending:</p>
            </div>
            <ul className="list-group">
              <li>Lessons list will be</li>
            </ul>
          </div>
        </div>
        <div className="col-md-5">
          LessonInfo
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  actions
)(StudentClasses)
