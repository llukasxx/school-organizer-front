import React, { Component } from 'react'
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
    const { students } = this.props
    let receiverLI = []
    students.map((el) => {
      receiverLI.push(<ReceiverListItem 
                        student={el}
                        key={el.id}/>)
    })
    return (
      <div className="list-group">
        {receiverLI}
      </div>
    )
  }
  renderPagination() {
    const { activeTab } = this.state
    console.log(this.props.studentsCount)
    switch(activeTab) {
      case 'students':
        return <Pagination count={this.props.studentsCount}/>
        break;
      case 'teachers':
        return <Pagination count={2}/>
        break;
      case 'groups':
        return <Pagination count={11}/>
        break;
    }
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

export default Receivers