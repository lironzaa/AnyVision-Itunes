import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import { clearErrors } from '../../actions/songsActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated === true) this.props.history.push('/');
    this.props.clearErrors();
  }

  static getDerivedStateFromProps(props) {
    return {
      errors: props.errors
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center mb-5">Login</h1>
              <form onSubmit={this.onSubmit} noValidate>
                <div className="form-group">
                  <input type="email" className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email
                  })} value={this.state.email}
                    onChange={this.onChange} placeholder="Email Address" name="email" />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <input type="password" className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                  })} value={this.state.password}
                    onChange={this.onChange} placeholder="Password" name="password" />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="text-danger">
                  {errors.loginError}
                </div>
                <input value="Submit" type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.protoTypes = {
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser, clearErrors })(Login);