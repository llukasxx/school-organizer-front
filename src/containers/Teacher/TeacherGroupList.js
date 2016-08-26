import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/modules/GroupsReducer'

import { groupsArraySelector } from '../../selectors/GroupsSelector'

import TeacherGroupInfo from './TeacherGroupInfo'
import TeacherGroupListItem from '../../components/TeacherGroupListItem'
import MessageBox from '../Common/MessageBox'



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
        activeGroup={this.props.activeGroup}
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
              {this.props.loaded ? this.props.groups.map(this.renderGroups) : "Loading..." }
            </ul>
          </div>
        </div>
        <TeacherGroupInfo />
        <MessageBox />
      </div>
    )
  }
}

TeacherGroupList.propTypes = {
  groups: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    activeGroup: state.teacherGroups.activeGroup,
    groups: groupsArraySelector(state),
    loaded: state.teacherGroups.loaded
  }
}

export default connect(
  mapStateToProps,
  actions
)(TeacherGroupList)
