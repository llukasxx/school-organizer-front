import React from 'react'
import Radium from 'radium'
import color from 'color'

import MySpinner from '../Spinner/Spinner'
import { smallSpinnerRight } from '../../utils/SpinnerConfig'

export class TeacherGroupListItem extends React.Component {
  constructor(props) {
    super(props)
    this.isActive = this.isActive.bind(this)
  }
  isActive() {
    return (
      this.props.activeGroup == this.props.group.name ? true : false
    )
  }
  render () {
    return (
      <li 
        className={this.isActive() ? "list-group-item active" : "list-group-item"} 
        style={styles}
        onClick={() => {
          this.props.setActiveGroup(this.props.group.name)
        }}>
        <strong>{this.props.group.name}</strong>
        {this.isActive() ? <MySpinner opts={smallSpinnerRight}/> : ""}
      </li>
    )
  }
}

export default Radium(TeacherGroupListItem)

TeacherGroupListItem.propTypes = { 
  group: React.PropTypes.object.isRequired,
  activeGroup: React.PropTypes.string.isRequired
}

const styles = {
  ':hover': {
    background: color('#0074d9').lighten(0.2).hexString(),
    cursor: "pointer"
  }
}