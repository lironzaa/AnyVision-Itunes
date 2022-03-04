import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

class ItemInfo extends Component {
    constructor() {
        super();
        this.state = {
            selectedSong: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated === false) this.props.history.push('/login');
        this.setState({ selectedSong: this.props.songs.selectedSong });
    }

    render() {
        const { selectedSong } = this.state;
        let songContent;
        if (Object.keys(selectedSong).length === 0) {
            songContent = <div><p>No content, please go to main screen and choose a song</p></div>
        } else {
            songContent = (
                <Fragment>
                    <div className="card-header font-weight-bold">
                        {selectedSong.trackName}
                    </div>
                    <div className="card-body">
                        <p className="card-text"><span
                            className="font-weight-bold">Artist :</span> {selectedSong.artistName}</p>
                        <p className="card-text"><span
                            className="font-weight-bold">Album :</span> {selectedSong.collectionName}</p>
                        <p className="card-text"><span className="font-weight-bold">Type :</span> {selectedSong.kind}
                        </p>
                        <p className="card-text"><span
                            className="font-weight-bold">Genre :</span> {selectedSong.primaryGenreName}</p>
                        <p className="card-text"><span
                            className="font-weight-bold">Release Date :</span> {selectedSong.releaseDate}</p>
                        <p className="card-text"><span
                            className="font-weight-bold">Track Price :</span> {selectedSong.trackPrice} $</p>
                        <p className="card-text"><span
                            className="font-weight-bold">Album Price :</span> {selectedSong.collectionPrice} $</p>
                        <img className="card-img-top" style={{
                            width: '300px',
                            height: '300px'
                        }} src={selectedSong.artworkUrl100} alt={selectedSong.trackName}/>
                        <div>
                            <ReactPlayer className="mx-auto mt-5 border border-info" url={selectedSong.previewUrl}
                                         controls/>
                        </div>
                    </div>
                </Fragment>
            )
        }

        return (
            <div className="card text-center">
                {songContent}
            </div>
        )
    }
}

ItemInfo.protoTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    songs: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    songs: state.songs,
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps)(ItemInfo);