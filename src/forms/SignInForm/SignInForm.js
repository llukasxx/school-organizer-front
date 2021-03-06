import React from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../redux/modules/AuthReducer'

import MySpinner from '../../components/Spinner/Spinner'

import { mediumSpinnerCenter } from '../../utils/SpinnerConfig'

export const fields = ['email', 'password']

const validate = (values) => {
  const errors = {}
  if(!values.email) {
    errors.email = 'Email can\'t be empty'
  }
  if(!values.password) {
    errors.password = 'Password can\'t be empty'
  }
  return errors
}

export class SignIn extends React.Component {
  constructor(props) {
    super(props)
  }
  renderFormErrors(field) {
    if(field.error && field.touched) {
      return (
        <p>{field.error}</p>
      )
    }
  }
  renderAuthError(error) {
    if(error) {
      return (
        <div>
          <br />
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error:</span>
            {error}
          </div>
        </div>
      ) 
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const {fields: {email, password}} = this.props
    this.props.signInUser(email.value, password.value)
  }
  handleDisable = () => {
    const { fields: {email, password} } = this.props
    if(email.value.length > 0 && password.value.length > 0) {
      return false
    } else {
      return true
    }
  }
  componentWillMount() {
    if(this.props.isLogged) {
      this.props.redirectUser(localStorage.getItem('accountType'))
    }
  }
  render() {
    const { fields: {email, password} } = this.props
    return (
      <div>
        <h2 className="text-center">Welcome, please log in to continue.</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group input-group-lg" style={{'marginBottom': '5px'}}>
            <span className="input-group-addon" id="sizing-addon1">@</span>
            <input disabled={this.props.loading} type="email" className="form-control" placeholder="Email" aria-describedby="sizing-addon1" {...email} />
          </div>
          {this.renderFormErrors(email)}
          <div className="input-group input-group-lg">
            <span className="input-group-addon" id="sizing-addon1"><span className="glyphicon glyphicon-lock"/></span>
            <input disabled={this.props.loading} type="password" className="form-control" placeholder="Password" aria-describedby="sizing-addon1" {...password} />
          </div>
          {this.renderFormErrors(password)}
          {this.renderAuthError(this.props.authInfo)}
          {this.props.loading ? <MySpinner opts={mediumSpinnerCenter}/> : ""}
          <hr />
          <p className="text-center">
            <button disabled={this.handleDisable() || this.props.loading} className="btn btn-success btn-lg">Sign in</button>
          </p>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    loading: state.auth.loading,
    isLogged: state.auth.authenticated,
    authInfo: state.auth.authInfo
  }
}


SignIn = reduxForm({
  form: 'SignIn',
  fields,
  validate
}, mapStateToProps, actions)(SignIn)

export default SignIn
