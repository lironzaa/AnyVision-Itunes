import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
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
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <form onSubmit={this.onSubmit} noValidate>
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" value={this.state.email}
                    onChange={this.onChange} placeholder="Email Address" name="email" />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" value={this.state.password}
                    onChange={this.onChange} placeholder="Password" name="password" />
                </div>
                {errors.loginError && (<div className="invalid-feedback">{errors.loginError}</div>)}
                <input value="Submit" type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Login;