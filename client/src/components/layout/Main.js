import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSongs } from '../../actions/songsActions';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      searchedQuery: '',
      songs: [],
      resultCount: null
    }
  }

  static getDerivedStateFromProps(props) {
    console.log(props);
    return {
      songs: props.songs.songs,
      resultCount: props.songs.resultCount
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onGetItem = itemID => {
    console.log(itemID);
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.fetchSongs(this.state.searchedQuery);
  }

  render() {
    const { songs, resultCount } = this.state;
    const searchItems = songs.length ? (
      songs.map(item => {
        return (
          <div onClick={() => this.onGetItem(item.trackId)} className="col-lg-2 col-md-6 col-sm-10 card mr-4 mb-5" key={item.trackId}>
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
      <div className="main">
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
                  className="form-control form-control-lg" onChange={this.onChange} placeholder="Search" name="searchedQuery" />
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

Main.protoTypes = {
  fetchSongs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  songs: state.songs,
  errors: state.errors
})

export default connect(mapStateToProps, { fetchSongs })(Main);