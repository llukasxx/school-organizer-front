import React from 'react'

export class ReceiverSearch extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { activeTab, query } = this.props
    let placeholder;
    switch(activeTab) {
      case 'students':
        placeholder = "Student name"
        break;
      case 'teachers':
        placeholder = "Teacher name"
        break;
      case 'groups':
        placeholder = "Group name"
        break;
      case 'lessons':
        placeholder = "Lesson name"
        break;
    }
    return (
      <div className="input-group">
        <span className="input-group-addon" id="sizing-addon1">Filter:</span>
        <input type="text" className="form-control" placeholder={placeholder} 
               aria-describedby="sizing-addon1" {...query}
               onChange={(e) => {
                 query.onChange(e)
                 this.props.handleChange(e.target.value)
               }}/>
      </div>
    )
  }
}

export default ReceiverSearch
