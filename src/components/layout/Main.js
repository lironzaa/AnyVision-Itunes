import React, { Component } from 'react';
import classnames from 'classnames';
import { searchItem } from '../../api/api';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      searchedQuery: '',
      searchResults: [],
      errors: {}
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    searchItem(this.state.searchedQuery).then(({ results, resultCount }) => {
      this.setState({ searchResults: results });
      console.log(this.state.searchResults);
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container main">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-3 mb-4">AnyVision Itunes</h1>
            <p className="lead">Search for your favorites songs/videos from Itunes</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 m-auto">
            <form onSubmit={this.onSubmit} noValidate>
              <div className="form-group">
                <input type="text" value={this.state.searchedQuery}
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.searchedQuery
                  })} onChange={this.onChange} placeholder="Search" name="searchedQuery" />
                {errors.searchedQuery && (<div className="invalid-feedback">{errors.searchedQuery}</div>)}
              </div>
              <input type="submit" value="Search" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;