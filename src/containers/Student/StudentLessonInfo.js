import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/LessonsReducer'



export class StudentLessonInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {activeTab: 'lessonDates'}
    this.changeTab = this.changeTab.bind(this)
  }
  changeTab(tab) {
    this.setState({activeTab: tab})
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
          <ul className="nav nav-tabs">
            <li role="presentation" 
                className={this.state.activeTab == 'lessonDates' ? 'active' : ''}
                onClick={() => {this.changeTab('lessonDates')}}>
              <a>Lesson Dates</a>
            </li>
            <li role="presentation"
                className={this.state.activeTab == 'grades' ? 'active' : ''}
                onClick={() => {this.changeTab('grades')}}>
              <a>Grades</a>
            </li>
            <li role="presentation"
                className={this.state.activeTab == 'classmates' ? 'active' : ''}
                onClick={() => {this.changeTab('classmates')}}>
              <a>Classmates</a>
            </li>
          </ul>
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
