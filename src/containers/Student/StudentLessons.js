import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/LessonsReducer'
import MessageBox from '../Common/MessageBox'
import LessonListItem from '../../components/LessonListItem'

import { allStudentLessonsArraySelector } from '../../selectors/StudentLessonsSelector'


export class StudentLessons extends React.Component {
  constructor(props) {
    super(props)
    this.renderLessonsListItems = this.renderLessonsListItems.bind(this)
  }
  renderLessonsListItems() {
    const { studentLessons } = this.props
    let lessonListItemArray = []
    studentLessons.map((el) => {
      lessonListItemArray.push(<LessonListItem lesson={el} key={el.id}/>)
    })
    return lessonListItemArray
  }
  componentDidMount() {
    this.props.fetchStudentLessons()
  }
  render() {
    return (
      <div>
        <div className="col-md-2 col-sm-4">
          <div className="panel panel-info">
            <div className="panel-heading">Lessons</div>
            <div className="panel-body">
              <p>Lessons you are attending:</p>
            </div>
            <ul className="list-group">
              {this.renderLessonsListItems()}
            </ul>
          </div>
        </div>
        <div className="col-md-5">
          LessonInfo
        </div>
        <MessageBox />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    studentLessons: allStudentLessonsArraySelector(state)
  }
}

export default connect(
  mapStateToProps,
  actions
)(StudentLessons)
