import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/ReceiversReducer'
import { studentsArraySelector,
         teachersArraySelector,
         groupsArraySelector,
         lessonsArraySelector } from '../../selectors/ReceiversSelector'

import StudentReceiverListItem from './StudentReceiverListItem'
import TeacherReceiverListItem from './TeacherReceiverListItem'
import GroupReceiverListItem from './GroupReceiverListItem'
import LessonReceiverListItem from './LessonReceiverListItem'
import Pagination from './Pagination'


class Receivers extends Component {
  constructor(props) {
    super(props)
    this.changeActiveTab = this.changeActiveTab.bind(this)
    this.renderPagination = this.renderPagination.bind(this)
    this.renderStudents = this.renderStudents.bind(this)
    this.renderTeachers = this.renderTeachers.bind(this)
    this.renderGroups = this.renderGroups.bind(this)
    this.renderLessons = this.renderLessons.bind(this)
  }
  changeActiveTab(newTab) {
    this.props.changeActiveTab(newTab)
    switch(newTab) {
      case 'students':
        this.props.getPaginatedStudents()
        break;
      case 'teachers':
        this.props.getPaginatedTeachers()
        break;
      case 'groups':
        this.props.getPaginatedGroups()
        break;
      case 'lessons':
        this.props.getPaginatedLessons()
        break;
    }
  }
  renderStudents() {
    const { students, studentsLoaded } = this.props
    let receiverLI = []
    if(studentsLoaded) {
      students.map((el) => {
        receiverLI.push(<StudentReceiverListItem 
                          student={el}
                          key={el.id}
                          groups={el.studentGroups}/>)
      })
    }
    return (
      <div className="list-group">
        {receiverLI}
      </div>
    )
  }
  renderTeachers() {
    const { teachers, teachersLoaded } = this.props
    let receiverLI = []
    if(teachersLoaded) {
      teachers.map((el) => {
        receiverLI.push(<TeacherReceiverListItem 
                          teacher={el}
                          key={el.id}
                          lessons={el.lessons}/>)
      })
    }
    return (
      <div className="list-group">
        {receiverLI}
      </div>
    )
  }
  renderGroups() {
    const { groups, groupsLoaded } = this.props
    let receiverLI = []
    if(groupsLoaded) {
      groups.map((el) => {
        receiverLI.push(<GroupReceiverListItem 
                          group={el}
                          key={el.id}
                          lessons={el.lessons}
                          totalStudents={el.totalStudents}/>)
      })
    }
    return (
      <div className="list-group">
        {receiverLI}
      </div>
    )
  }
  renderLessons() {
    const { lessons, lessonsLoaded } = this.props
    let receiverLI = []
    if(lessonsLoaded) {
      lessons.map((el) => {
        receiverLI.push(<LessonReceiverListItem 
                          lesson={el}
                          key={el.id}
                          groups={el.groups}
                          totalStudents={el.totalStudents}/>)
      })
    }
    return (
      <div className="list-group">
        {receiverLI}
      </div>
    )
  }
  renderPagination() {
    const { activeTab, 
            getPaginatedStudents,
            getPaginatedTeachers,
            getPaginatedGroups,
            getPaginatedLessons,
            studentsCount,
            teachersCount,
            groupsCount,
            lessonsCount,
            activePage } = this.props
    switch(activeTab) {
      case 'students':
        return <Pagination
                getData={getPaginatedStudents} 
                count={studentsCount}
                currentPage={activePage}/>
        break;
      case 'teachers':
        return <Pagination
                getData={getPaginatedTeachers} 
                count={teachersCount}
                currentPage={activePage}/>
        break;
      case 'groups':
        return <Pagination
                getData={getPaginatedGroups} 
                count={groupsCount}
                currentPage={activePage}/>
        break;
      case 'lessons':
        return <Pagination
                getData={getPaginatedLessons} 
                count={lessonsCount}
                currentPage={activePage}/>
        break;
      default:
        return <Pagination count={0}/>
        break;
    }
  }
  componentDidMount() {
    this.props.getPaginatedStudents()
    this.props.changeActiveTab()
  }
  render() {
    const { activeTab } = this.props
    let listToRender = this.renderStudents
    switch(activeTab) {
      case 'students':
        listToRender = this.renderStudents
        break;
      case 'teachers':
        listToRender = this.renderTeachers
        break;
      case 'groups':
        listToRender = this.renderGroups
        break;
      case 'lessons':
        listToRender = this.renderLessons
        break;
    }
    return (
      <div>
        <ul className="nav nav-tabs">
          <li role="presentation" 
              className={activeTab == 'students' ? 'active' : ''}
              onClick={(e) => {
                this.changeActiveTab('students')
              }}>
            <a style={{cursor: 'pointer'}}>Students</a>
          </li>
          <li role="presentation" 
              className={activeTab == 'teachers' ? 'active' : ''}
              onClick={(e) => {
                this.changeActiveTab('teachers')
              }}>
            <a style={{cursor: 'pointer'}}>Teachers</a>
          </li>
          <li role="presentation" 
              className={activeTab == 'groups' ? 'active' : ''}
              onClick={(e) => {
                this.changeActiveTab('groups')
              }}>
            <a style={{cursor: 'pointer'}}>Groups</a>
          </li>
          <li role="presentation" 
              className={activeTab == 'lessons' ? 'active' : ''}
              onClick={(e) => {
                this.changeActiveTab('lessons')
              }}>
            <a style={{cursor: 'pointer'}}>Lessons</a>
          </li>
        </ul>
        <br />
        <div className="input-group input-group-lg">
          <span className="input-group-addon" id="sizing-addon1">Filter</span>
          <input type="text" className="form-control" placeholder="Full name" aria-describedby="sizing-addon1"/>
        </div>
        {this.renderPagination()}
        {listToRender()}
        {this.renderPagination()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeTab: state.receivers.activeTab,
    students: studentsArraySelector(state),
    teachers: teachersArraySelector(state),
    groups: groupsArraySelector(state),
    lessons: lessonsArraySelector(state),
    studentsCount: state.receivers.students.count,
    teachersCount: state.receivers.teachers.count,
    groupsCount: state.receivers.groups.count,
    lessonsCount: state.receivers.lessons.count,
    studentsLoaded: state.receivers.students.loaded,
    teachersLoaded: state.receivers.teachers.loaded,
    groupsLoaded: state.receivers.groups.loaded,
    lessonsLoaded: state.receivers.lessons.loaded,
    activePage: state.receivers.activePage
  }
}

export default connect(mapStateToProps, actions)(Receivers)