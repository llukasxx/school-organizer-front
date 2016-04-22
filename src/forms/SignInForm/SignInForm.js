import React from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../redux/modules/AuthReducer'

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

type Props = {
  handleSubmit: Function,
  fields: Object,
};

export class SignIn extends React.Component {
  props: Props;
  constructor(props) {
    super(props)
  }
  renderErrors(field) {
    if(field.error && field.touched) {
      return (
        <p>{field.error}</p>
      )
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const {fields: {email, password}} = this.props
    this.props.signInUser(email, password)
  }
  handleDisable = () => {
    const { fields: {email, password} } = this.props
    if(email.value.length > 0 && password.value.length > 0) {
      return false
    } else {
      return true
    }
  }
  componentDidMount() {
    let spinner = new Spinner().spin()
    let target = document.getElementById('spinner')
    target.appendChild(spinner.el)
  }
  render() {
    const { fields: {email, password} } = this.props
    return (
      <div>
        <div id="spinner" className={this.props.loading ? "" : "hidden"}></div>
        <h2 className="text-center">Welcome, please log in to continue.</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group input-group-lg" style={{'marginBottom': '5px'}}>
            <span className="input-group-addon" id="sizing-addon1">@</span>
            <input type="email" className="form-control" placeholder="Email" aria-describedby="sizing-addon1" {...email} />
          </div>
          {this.renderErrors(email)}
          <div className="input-group input-group-lg">
            <span className="input-group-addon glyphicon glyphicon-lock" id="sizing-addon1"></span>
            <input type="password" className="form-control" placeholder="Password" aria-describedby="sizing-addon1" {...password} />
          </div>
          {this.renderErrors(password)}
          <hr />
          <p className="text-center">
            <button disabled={this.handleDisable()} className="btn btn-success btn-lg">Sign in</button>
          </p>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.error,
    loginInfo: state.auth.loginInfo,
    loading: state.auth.loading 
  }
}


SignIn = reduxForm({
  form: 'SignIn',
  fields,
  validate
}, mapStateToProps, actions)(SignIn)

export default SignIn
