import React, { Component } from 'react';
import classnames from 'classnames';
import { searchItem } from '../../api/api';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      searchedQuery: '',
      searchResults: [],
      resultCount: null,
      error: ''
    }
  }

  validate = () => {
    console.log(this.state.searchedQuery.length);
    if (this.state.searchedQuery.length === 0) {
      console.log('test2');
      this.setState({ error: 'Searched song/movie must contain at least 1 character' });
      return false;
    }
    return true;
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      searchItem(this.state.searchedQuery).then(({ results, resultCount }) => {
        this.setState({ searchResults: results, resultCount });
        console.log(this.state.searchResults);
      });
    }
  }

  render() {
    const { error, searchResults, resultCount } = this.state;
    const searchItems = searchResults.length ? (
      searchResults.map(item => {
        return (
          <div className="col-lg-2 col-md-6 col-sm-10 card mr-4 mb-5" key={item.trackId}>
            <img className="card-img-top" src={item.artworkUrl100} alt={item.trackName}></img>
            <div className="card-body">
              <h5 className="card-title">{item.trackName}</h5>
              <p className="card-text"><span className="font-weight-bold">Type :</span> {item.kind}</p>
              <p className="card-text"><span className="font-weight-bold">Artist :</span> {item.artistName}</p>
              <p className="card-text"><span className="font-weight-bold">Album :</span> {item.collectionName}</p>
            </div>
          </div>
        )
      })
    ) : resultCount === null ? <div className="mx-auto">Please search for a song/movie</div> : <div className="mx-auto">No results for this search</div>;

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
                    'is-invalid': error
                  })} onChange={this.onChange} placeholder="Search" name="searchedQuery" />
                {error && (<div className="invalid-feedback">{error}</div>)}
              </div>
              <input type="submit" value="Search" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
        <div className="row mt-5">
          {searchItems}
        </div>
      </div>
    )
  }
}

export default Main;