import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/ReceiversReducer'
import { studentsArraySelector } from '../../selectors/ReceiversSelector'

import ReceiverListItem from './ReceiverListItem'
import Pagination from './Pagination'


class Receivers extends Component {
  constructor(props) {
    super(props)
    this.state = {activeTab: 'students'}
    this.changeActiveTab = this.changeActiveTab.bind(this)
    this.renderPagination = this.renderPagination.bind(this)
  }
  changeActiveTab(newTab) {
    this.setState({activeTab: newTab})
  }
  renderStudents() {
    const { students, loaded } = this.props
    let receiverLI = []
    if(loaded) {
      students.map((el) => {
        receiverLI.push(<ReceiverListItem 
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
  renderPagination() {
    const { activeTab } = this.state
    switch(activeTab) {
      case 'students':
        return <Pagination
                getData={this.props.getPaginatedStudents} 
                count={this.props.studentsCount}
                currentPage={this.props.studentsPage}/>
        break;
      case 'teachers':
        return <Pagination count={2}/>
        break;
      case 'groups':
        return <Pagination count={11}/>
        break;
      default:
        return <Pagination count={0}/>
        break;
    }
  }
  componentDidMount() {
    this.props.getPaginatedStudents()
  }
  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li role="presentation" 
              className={this.state.activeTab == 'students' ? 'active' : ''}
              onClick={(e) => {
                this.changeActiveTab('students')
              }}>
            <a style={{cursor: 'pointer'}}>Students</a>
          </li>
          <li role="presentation" 
              className={this.state.activeTab == 'teachers' ? 'active' : ''}
              onClick={(e) => {
                this.changeActiveTab('teachers')
              }}>
            <a style={{cursor: 'pointer'}}>Teachers</a>
          </li>
          <li role="presentation" 
              className={this.state.activeTab == 'groups' ? 'active' : ''}
              onClick={(e) => {
                this.changeActiveTab('groups')
              }}>
            <a style={{cursor: 'pointer'}}>Groups</a>
          </li>
        </ul>
        <br />
        <div className="input-group input-group-lg">
          <span className="input-group-addon" id="sizing-addon1">Filter</span>
          <input type="text" className="form-control" placeholder="Full name" aria-describedby="sizing-addon1"/>
        </div>
        {this.renderPagination()}
        {this.renderStudents()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeTab: state.receivers.activeTab,
    students: studentsArraySelector(state),
    studentsCount: state.receivers.students.count,
    loaded: state.receivers.students.loaded,
    studentsPage: state.receivers.students.page
  }
}

export default connect(mapStateToProps, actions)(Receivers)