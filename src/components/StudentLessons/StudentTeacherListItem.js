import React, { Component } from 'react'
import NewConversation from '../../forms/NewConversationForm'

class StudentTeacherListItem extends Component {
  constructor(props) {
    super(props)
    this.state = { showConvForm: false }
    this.toggleForm = this.toggleForm.bind(this)
  }
  toggleForm() {
    this.setState({ showConvForm: !this.state.showConvForm })
  }
  render() {
    const { user } = this.props
    return (
      <li className="list-group-item">
        {`${user.firstName} ${user.lastName}`}
        <span 
          className="glyphicon glyphicon-envelope pull-right"
          onClick={this.toggleForm}/>
        {this.state.showConvForm ? <NewConversation 
                                      resetParent={this.toggleForm}
                                      key={user.id} 
                                      formKey={String(user.id)}
                                      studentId={user.id}
                                    /> : ""}
      </li>
    )
  }
}



export default StudentTeacherListItem