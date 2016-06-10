import React, { Component } from 'react'
import StudentReceiverListItem from './StudentReceiverListItem'
import TeacherReceiverListItem from './TeacherReceiverListItem'
import GroupReceiverListItem from './GroupReceiverListItem'
import LessonReceiverListItem from './LessonReceiverListItem'

class ReceiversBox extends Component {
  constructor(props) {
    super(props)
    this.renderReceivers = this.renderReceivers.bind(this)
  }
  renderReceivers() {
    const { activeReceivers, removeReceiver } = this.props
    let receiversItems = []
    activeReceivers.map((el, index) => {
      switch(el.type) {
        case 'student':
          receiversItems.push(<StudentReceiverListItem 
                                key={index}
                                index={index}
                                student={el}
                                groups={el.groups}
                                changeReceiver={removeReceiver}/>)
          break;
        case 'teacher':
          receiversItems.push(<TeacherReceiverListItem 
                                key={index}
                                index={index}
                                teacher={el}
                                lessons={el.lessons}
                                changeReceiver={removeReceiver}/>)
          break;
        case 'group':
          receiversItems.push(<GroupReceiverListItem 
                                group={el}
                                index={index}
                                key={index}
                                lessons={el.lessons}
                                totalStudents={el.totalStudents}
                                changeReceiver={removeReceiver}/>)
          break;
        case 'lesson':
          receiversItems.push(<LessonReceiverListItem 
                                lesson={el}
                                key={index}
                                index={index}
                                groups={el.groups}
                                totalStudents={el.totalStudents}
                                changeReceiver={removeReceiver}/>)
          break;
      }
    })
    return (
      <div className="row">
        <div className="list-group">
          {receiversItems}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div style={{display: 'inline-block'}}>
        <h3>Receivers:</h3>
        {this.renderReceivers()}
        <button className="btn btn-lg btn-success">
          Send Message <span className="glyphicon glyphicon-send"/>
        </button>
      </div>
    )
  }
}

export default ReceiversBox