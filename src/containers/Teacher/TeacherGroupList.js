import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TeacherGroupInfo from '../../components/TeacherGroupInfo'
import TeacherMessageBox from './TeacherMessageBox'


type Props = {

}
export class TeacherGroupList extends React.Component {
  props: Props;

  render() {
    return (
      <div>
        <div className="col-md-2 col-sm-4">
          <div className="panel panel-info">
            <div className="panel-heading">Groups</div>
            <div className="panel-body">
              <p>Click on each if you want to see more info.</p>
            </div>
          </div>
        </div>
        <TeacherGroupInfo />
        <TeacherMessageBox />
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
)(TeacherGroupList)
