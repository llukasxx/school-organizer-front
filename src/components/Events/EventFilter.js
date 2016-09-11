import React from 'react'

export class EventFilter extends React.Component {
  constructor(props) {
    super(props)
    this.changeActiveFilter = this.changeActiveFilter.bind(this)
  }
  changeActiveFilter(filter) {
    this.props.changeActiveFilter(filter)
  }
  render () {
    const { activeFilter } = this.props
    return (
      <div className="panel-body">
        <ul className="breadcrumb">
          <li>
            <a style={activeFilter == 'all' ? active : inactive}
               onClick={() => {this.changeActiveFilter('all')}}>
              All
            </a>
          </li>
          <li>
            <a style={activeFilter == 'connected' ? active : inactive}
               onClick={() => {this.changeActiveFilter('connected')}}>
              Connected to me
            </a>
          </li>
          <li>
            <a style={activeFilter == 'created' ? active : inactive}
               onClick={() => {this.changeActiveFilter('created')}}>
              Created by me
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default EventFilter

const inactive = {'textDecoration': 'line-through'}
const active = {'textDecoration': 'underline'}