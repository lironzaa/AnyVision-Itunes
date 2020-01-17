import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSongs, setSelectedSong } from '../../actions/songsActions';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      searchedQuery: '',
      songs: [],
      resultCount: null,
      error: ''
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) this.props.history.push('/login');
  }

  static getDerivedStateFromProps(props) {
    return {
      songs: props.songs.songs,
      resultCount: props.songs.resultCount,
      error: props.errors.message
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onGetItem = selectedSong => {
    this.props.setSelectedSong(selectedSong);
    console.log(selectedSong);
    this.props.history.push('/item-info');
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.fetchSongs(this.state.searchedQuery);
  }

  render() {
    const { songs, resultCount, error } = this.state;

    const searchItems = songs.length ? (
      songs.map(item => {
        return (
          <div onClick={() => this.onGetItem(item)} className="col-lg-2 col-md-6 col-sm-10 card mr-4 mb-5" key={item.trackId}>
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

    const errorMessage = error !== undefined ?
      <div className="row mt-5">
        <div className="col-md-8 m-auto text-center">
          <div className="alert alert-danger" role="alert">
            <p className="lead">{error}</p>
          </div>
        </div>
      </div> : <Fragment></Fragment>;

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
        {errorMessage}
      </div>
    )
  }
}

Main.protoTypes = {
  fetchSongs: PropTypes.func.isRequired,
  setSelectedSong: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  songs: state.songs,
  errors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchSongs, setSelectedSong })(Main);