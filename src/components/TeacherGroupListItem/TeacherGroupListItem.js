import React from 'react'
import Radium from 'radium'
import color from 'color'

export class TeacherGroupListItem extends React.Component {
  props: Props;

  render () {

    return (
      <li className="list-group-item active" style={styles}>
        <strong>1k411</strong>
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