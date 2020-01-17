import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated === true) this.props.history.push('/')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>
              <form onSubmit={this.onSubmit} noValidate>
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" value={this.state.email}
                    onChange={this.onChange} placeholder="Email Address" name="email" />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" value={this.state.password}
                    onChange={this.onChange} placeholder="Password" name="password" />
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {
  registerUser
})(withRouter(Register));