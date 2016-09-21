import React from 'react'
import { bindActionCreators } from 'redux'
import DateTimePicker  from 'react-datetime'
import { reduxForm } from 'redux-form'
import moment from 'moment'
import * as groupActions from '../../redux/modules/GroupsReducer'
import * as eventActions from '../../redux/modules/EventsReducer'


import { simpleGroupsArraySelector, simpleGroupsArraySelectorById } from '../../selectors/GroupsSelector'

import SimpleGroupListItem from './SimpleGroupListItem'

export const fields = ['name']

const validate = (values) => {
  const errors = {}
  return errors
}

export class NewEventCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state = { eventDate: new Date() }
    this.getDate = this.getDate.bind(this)
    this.renderGroupListItems = this.renderGroupListItems.bind(this)
    this.renderFilterInput = this.renderFilterInput.bind(this)
  }
  getDate(date) {
    this.setState({eventDate: date})
  }
  renderGroupListItems() {
    const { groups } = this.props
    let groupListItems = []
    if(groups && groups.length > 0) {
      groups.map((el) => {
        groupListItems.push(<SimpleGroupListItem 
          group={el} 
          key={el.id}
          pickGroup={this.props.actions.eventActions.addGroup}/>)
      })
    } else {
      return "No groups found."
    }
    return groupListItems
  }
  renderFilterInput() {
    return <input 
    onChange={(e) => {
      e.preventDefault()
      this.setState({groupFilterValue: e.value})
    }} 
    autofocus
    placeholder="Group name..."/>
  }
  componentDidMount() {
    this.props.actions.groupActions.fetchAllGroups()
  }
  render() {
    const { fields: {name, eventDate, groups}, handleSubmit } = this.props
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
                                                this.setState({groupFilterValue: ""})
                                              }} className="glyphicon glyphicon-remove" /> : "Turn on filter"}</a>
              </i>
            </p>
            {this.renderGroupListItems()}
          </div>
        </div>
        <hr />
        <p><b>Invited groups:</b></p>

      </form>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    groups: simpleGroupsArraySelector(state),
    invitedGroups: simpleGroupsArraySelectorById(state,props) 
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
