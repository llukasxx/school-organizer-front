import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/LessonsReducer'

import StudentLessonMenu from '../../components/StudentLessonMenu'



export class StudentLessonInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {activeTab: 'lessonDates'}
    this.changeTab = this.changeTab.bind(this)
    this.renderItems = this.renderItems.bind(this)
    this.renderLessonDates = this.renderLessonDates.bind(this)
    this.renderGrades = this.renderGrades.bind(this)
    this.renderClassmates = this.renderClassmates.bind(this)
  }
  changeTab(tab) {
    this.setState({activeTab: tab})
  }
  renderLessonDates() {
    const { lessonDates } = this.props
    let ldArrayElements = []
    lessonDates.map((el) => {
      console.log(lessonDates)
      ldArrayElements.push(<li className="list-group-item"
                               key={el.id}>
                             {el.date}
                           </li>)
    })
    return (
      <ul className="list-group">
        {ldArrayElements}
      </ul>
    )
  }
  renderGrades() {

  }
  renderClassmates() {
    
  }
  renderItems() {
    switch(this.state.activeTab) {
      case 'lessonDates':
        return this.renderLessonDates()
      case 'grades':
        return this.renderGrades()
      case 'classmates':
        return this.renderClassmates()
      default:
        return this.renderLessonDates()
    }
  }
  render() {
    const { activeLesson, loaded } = this.props

    return (
      <div className="col-md-5">
        <div className="panel panel-primary">
          <div className="panel-heading">Lesson Info</div>
          <div className="panel-body">
            <p className="text-center"><b>{loaded ? activeLesson.name : 'Loading...'}</b></p>
          </div>
          <StudentLessonMenu 
            activeTab = {this.state.activeTab}
            changeTab = {this.changeTab}/>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeLesson: state.lessons.activeLesson,
    loaded: state.lessons.loaded
  }
}

export default connect(
  mapStateToProps,
  actions
)(StudentLessonInfo)
