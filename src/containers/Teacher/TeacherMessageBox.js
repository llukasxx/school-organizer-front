import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


export class TeacherMessageBox extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="col-md-5 col-sm-6 ">
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">Recent Messages</h3>
          </div>
          <div className="panel-body">
            
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherMessageBox)
