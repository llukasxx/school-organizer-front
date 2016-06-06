import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/ReceiversReducer'
import { studentsArraySelector,
         teachersArraySelector } from '../../selectors/ReceiversSelector'

import StudentReceiverListItem from './StudentReceiverListItem'
import TeacherReceiverListItem from './TeacherReceiverListItem'
import Pagination from './Pagination'


class Receivers extends Component {
  constructor(props) {
    super(props)
    this.changeActiveTab = this.changeActiveTab.bind(this)
    this.renderPagination = this.renderPagination.bind(this)
    this.renderStudents = this.renderStudents.bind(this)
    this.renderTeachers = this.renderTeachers.bind(this)
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
    }
  }
  renderStudents() {
    const { students, studentsLoaded } = this.props
    let receiverLI = []
    if(studentsLoaded) {
      students.map((el) => {
        receiverLI.push(<StudentReceiverListItem 
                          student={el}
                          key={el.id}/>)
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
                          key={el.id}/>)
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
            studentsCount,
            teachersCount,
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
        return <Pagination count={11}/>
        break;
      case 'lessons':
        return <Pagination count={11}/>
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
    studentsCount: state.receivers.students.count,
    teachersCount: state.receivers.teachers.count,
    studentsLoaded: state.receivers.students.loaded,
    teachersLoaded: state.receivers.teachers.loaded,
    activePage: state.receivers.activePage
  }
}

export default connect(mapStateToProps, actions)(Receivers)