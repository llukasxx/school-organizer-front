import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent, accountType = 'student') {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated || accountType != localStorage.accountType) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated || accountType != localStorage.accountType) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { 
      authenticated: state.auth.authenticated
    };
  }

  return connect(mapStateToProps)(Authentication);
}