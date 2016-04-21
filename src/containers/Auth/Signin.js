import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

type Props = {

}
export class LoginForm extends React.Component {
  props: Props;

  render() {
    return (
      <div>
        <h2 className="text-center">Welcome, please log in to continue.</h2>
        <form>
          <div className="input-group input-group-lg" style={{'marginBottom': '5px'}}>
            <span className="input-group-addon" id="sizing-addon1">@</span>
            <input type="email" className="form-control" placeholder="Email" aria-describedby="sizing-addon1" />
          </div>
          <div className="input-group input-group-lg">
            <span className="input-group-addon glyphicon glyphicon-lock" id="sizing-addon1"></span>
            <input type="password" className="form-control" placeholder="Password" aria-describedby="sizing-addon1" />
          </div>
          <hr />
          <p className="text-center">
            <button className="btn btn-success btn-lg">Sign in</button>
          </p>
        </form>
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
)(LoginForm)
