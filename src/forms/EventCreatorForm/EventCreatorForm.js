import React from 'react'
import { bindActionCreators } from 'redux'
import DateTimePicker  from 'react-datetime'
import { reduxForm } from 'redux-form'
import moment from 'moment'
import * as groupActions from '../../redux/modules/GroupsReducer'
import * as eventActions from '../../redux/modules/EventsReducer'


import { simpleGroupsArraySelector, simpleGroupsArraySelectorById } from '../../selectors/GroupsSelector'

import SimpleGroupListItem from './SimpleGroupListItem'

export const fields = ['name', 'groupNameFilter']

const validate = (values) => {
  const errors = {}
  return errors
}

export class NewEventCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state = { eventDate: new Date(), groupFilter: false }
    this.getDate = this.getDate.bind(this)
    this.renderGroupListItems = this.renderGroupListItems.bind(this)
    this.renderFilterInput = this.renderFilterInput.bind(this)
    this.validateEvent = this.validateEvent.bind(this)
  }
  getDate(date) {
    this.setState({eventDate: date})
  }
  renderGroupListItems(groups = [], addition = true, IDfilter = [], groupNameFilter = "") {
    let groupListItems = []
    const { addGroup, removeGroup } = this.props.actions.eventActions
    if(groups && groups.length > 0) {
      groups.map((el) => {
        if(!IDfilter.includes(el.id) && (groupNameFilter == "" || el.name.match(groupNameFilter)) !== null) {
          groupListItems.push(<SimpleGroupListItem 
            group={el} 
            key={el.id}
            pickGroup={addition ? addGroup : removeGroup}
            additionSign={addition}/>)
        }
      })
    } else {
      return (
        <div>
          <p>No groups found.</p>
          <i><small>*at least one group must be invited</small></i>
        </div>
      )
    }
    return groupListItems
  }
  renderFilterInput() {
    const { fields: { groupNameFilter } } = this.props
    return (<input 
            autofocus
            placeholder="Group name..."
            {...groupNameFilter}/>)
  }
  validateEvent() {
    const { fields: { name }, invitedGroups } = this.props
    //console.log(name, invitedGroups)
    if(name.value.length > 0 && invitedGroups.length > 0) {
      return false
    } else {
      return true
    }
  }
  componentDidMount() {
    this.props.actions.groupActions.fetchAllGroups()
  }
  render() {
    const { fields: { name }, handleSubmit, invitedGroupsIds } = this.props
    const groupNameFilter = this.props.fields.groupNameFilter.value || ""
    return (
      <form onSubmit={handleSubmit}>
        <div className="input-group" style={{'marginBottom': '7px'}}>
          <span className="input-group-addon" id="basic-addon3">Name:</span>
          <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" {...name}/>
        </div>
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon3" style={{'paddingRight': '20px'}}>Date:</span>
          
          <DateTimePicker
            value = {this.state.eventDate}
            onChange={this.getDate}
          />
        </div>
        <div className="row">
          <div className="col-md-12">
            <p>
              <i>Invite groups:</i>
              <i className="pull-right">
                {this.state.groupFilter ? this.renderFilterInput() : ""}
                <a style={{cursor: 'pointer'}} 
                onClick={(e) => {
                  e.preventDefault()
                  this.setState({groupFilter: !this.state.groupFilter})
                }}>{this.state.groupFilter ? <span onClick={(e) => {
                                                this.props.fields.groupNameFilter.onChange("")
                                              }} className="glyphicon glyphicon-remove" /> : "Turn on filter"}</a>
              </i>
            </p>
            {this.renderGroupListItems(this.props.groups, true, invitedGroupsIds, groupNameFilter)}
          </div>
        </div>
        <hr />
        <p><b>Invited groups:</b></p>
        <div>
          {this.renderGroupListItems(this.props.invitedGroups, false)}
        </div>
        <hr />
        <button className="btn btn-lg btn-success" disabled={this.validateEvent()}>
          Create event <span className="glyphicon glyphicon-list-alt"/>
        </button>
      </form>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    groups: simpleGroupsArraySelector(state),
    invitedGroups: simpleGroupsArraySelectorById(state),
    invitedGroupsIds: state.events.invitedGroupsIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      groupActions: bindActionCreators(groupActions, dispatch),
      eventActions: bindActionCreators(eventActions, dispatch)
    }
  }
}

NewEventCreator = reduxForm({
  form: 'NewEventCreator',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(NewEventCreator)

export default NewEventCreator
