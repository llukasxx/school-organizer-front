import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../redux/modules/GroupsReducer'


import TeacherGroupInfo from '../../components/TeacherGroupInfo'
import TeacherMessageBox from './TeacherMessageBox'
import TeacherGroupListItem from '../../components/TeacherGroupListItem'



export class TeacherGroupList extends React.Component {
  constructor(props) {
    super(props)
    this.renderGroups = this.renderGroups.bind(this)
  }
  renderGroups(el) {
    return (
      <TeacherGroupListItem 
        key={el.name} 
        group={el} 
        activeGroup={this.props.groups.activeGroup}
        setActiveGroup={this.props.setActiveGroup}/>
    )
  }
  componentDidMount() {
    this.props.fetchTeacherGroups()
  }
  render() {
    return (
      <div>
        <div className="col-md-2 col-sm-4">
          <div className="panel panel-info">
            <div className="panel-heading">Groups</div>
            <div className="panel-body">
              <p>Click on each if you want to see more info.</p>
            </div>
            <ul className="list-group">
              {this.props.groups.loaded ? this.props.groups.groupItems.map(this.renderGroups) : "Loading..." }
            </ul>
          </div>
        </div>
        <TeacherGroupInfo />
        <TeacherMessageBox />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.teacherGroups
  }
}

export default connect(
  mapStateToProps,
  actions
)(TeacherGroupList)
