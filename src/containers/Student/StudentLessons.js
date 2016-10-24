import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/LessonsReducer'
import MessageBox from '../Common/MessageBox'
import StudentLessonInfo from './StudentLessonInfo'
import LessonListItem from '../../components/LessonListItem'

import { allStudentLessonsArraySelector,
         activeLessonLessonDatesArraySelector,
         activeLessonGradesArraySelector,
         activeLessonStudentsArraySelector,
         activeLessonTeachersArraySelector } from '../../selectors/StudentLessonsSelector'


export class StudentLessons extends React.Component {
  constructor(props) {
    super(props)
    this.renderLessonsListItems = this.renderLessonsListItems.bind(this)
  }
  renderLessonsListItems() {
    const { studentLessons, changeActiveLesson, activeLesson } = this.props
    let lessonListItemArray = []
    studentLessons.map((el) => {
      lessonListItemArray.push(<LessonListItem 
                                  lesson={el} 
                                  key={el.id}
                                  changeActiveLesson={changeActiveLesson}
                                  activeLesson={activeLesson}/>)
    })
    if(lessonListItemArray.length > 0) {
      return lessonListItemArray
    } else {
      return 'No lesson assignment.'
    }
  }
  componentDidMount() {
    this.props.fetchStudentLessons()
  }
  render() {
    const { activeLessonLessonDates, 
            activeLessonGrades,
            activeLessonStudents,
            activeLessonTeachers } = this.props
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
        <StudentLessonInfo 
          lessonDates={activeLessonLessonDates}
          studentGrades={activeLessonGrades}
          students={activeLessonStudents}
          teachers={activeLessonTeachers}/>
        <MessageBox />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    studentLessons: allStudentLessonsArraySelector(state),
    activeLesson: state.lessons.activeLesson,
    activeLessonLessonDates: activeLessonLessonDatesArraySelector(state),
    activeLessonGrades: activeLessonGradesArraySelector(state),
    activeLessonStudents: activeLessonStudentsArraySelector(state),
    activeLessonTeachers: activeLessonTeachersArraySelector(state)
  }
}

export default connect(
  mapStateToProps,
  actions
)(StudentLessons)
